using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BasilCoins.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebOptimizer;
using z.Data;

namespace BasilCoins.Controllers
{
    public class RouteController : Controller
    {
        protected readonly IHostingEnvironment Host;
        protected IHttpContextAccessor Accessor;
                
        public RouteController(IHostingEnvironment hostingEnvironment, IHttpContextAccessor accessor)
        {
            this.Accessor = accessor;
            this.Host = hostingEnvironment;
        }

        public IActionResult Index()
        {
            return Views();
        }

        protected IActionResult Views()
        {
            var nPage = Path.Combine(Host.WebRootPath, "index.html");
            var cPage = System.IO.File.ReadAllText(nPage);
            var readSw = System.IO.File.ReadAllText(Path.Combine(Host.WebRootPath, "basils-sw_reference.js"));

            var token = CreateClientToken(Request, Accessor);

            cPage = ReplaceCode(cPage, "Encryption", token);

            if (AppSettings.IsProduction)
            {
                cPage = ReplaceCode(cPage, "SystemJS", $"<script src=\"/bundles/sys{AppSettings.SystemJSVersion}\"></script>");
                cPage = ReplaceCode(cPage, "ControllersJS", $"<script src=\"/bundles/ctrl{AppSettings.ControllersJSVersion}\"></script>");
                cPage = ReplaceCode(cPage, "ForDevelopment", "");
            }
            else
            {
                cPage = ReplaceCode(cPage, "SystemJS", "");
                cPage = ReplaceCode(cPage, "ControllersJS", "");
                cPage = ReplaceCode(cPage, "ForDevelopment", SetDevelopmentScript());
            }


            readSw = ReplaceCode(readSw, "StaticFiles", SetServiceWorkerStaticFiles());
            readSw = ReplaceCode(readSw, "CacheVersion", AppSettings.ControllersJSVersion);

            System.IO.File.WriteAllText(Path.Combine(Host.WebRootPath, "basils-sw.js"), readSw);



            return new ContentResult
            {
                Content = Regex.Replace(cPage, @"^\s+", "", RegexOptions.Multiline | RegexOptions.Compiled),
                ContentType = "text/html",
                StatusCode = 200
            };
        }
        
        public static string CreateClientToken(HttpRequest Request, IHttpContextAccessor accessor)
        {
            var ip = accessor.HttpContext.Connection.RemoteIpAddress.ToString().Replace("::1", "127.0.0.1");
            var ticks = DateTime.UtcNow.Ticks;

            var enc1 = string.Join(":", new string[] { ip, ticks.ToString() });

            var hashLeft = CryptoJS.Encrypt(enc1, AppSettings.Encryption.Key, AppSettings.Encryption.Salt);
            var hashRight = string.Join(":", new string[] { AppSettings.Encryption.UID, ticks.ToString(), AppSettings.Encryption.Key.CompressToUTF16(), AppSettings.Encryption.Salt.CompressToUTF16() });

            return Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(":", hashRight, hashLeft)));
        }

        private string SetDevelopmentScript()
        {

            String scripts = "";

            DirectoryInfo crtlSys = new DirectoryInfo(Path.Combine(Host.WebRootPath, "Scripts/System"));

            string[] sys = crtlSys.GetFiles("*.js", SearchOption.AllDirectories).Select(x => x.FullName.Replace(Host.WebRootPath, "")).ToArray();

            foreach (var d in sys)
            {
                scripts += $"<script src=\"{d}\"></script>";
            }
            
            DirectoryInfo ctrls = new DirectoryInfo(Path.Combine(Host.WebRootPath, "App/Controllers"));

            string[] ctrl = ctrls.GetFiles("*.js", SearchOption.AllDirectories).Select(x => x.FullName.Replace(Host.WebRootPath, "")).ToArray();
            
            foreach(var d in ctrl)
            {

                scripts += $"<script src=\"{d}\"></script>";
            }
            
            return scripts;
        }

        private string SetServiceWorkerStaticFiles()
        {
            DirectoryInfo dir = new DirectoryInfo(Host.WebRootPath);

            return new string[] { "*.html", "*.jpg", "*.png", "*.ico" }
                             .SelectMany(i => dir.GetFiles(i, SearchOption.AllDirectories).Select(x => "'" + x.FullName.Replace(Host.WebRootPath, ".").Replace("\\", "/") + "'"))
                             .ToArray().Join(",");
        }





        protected string ReplaceCode(string body, string key, string repvalue)
        {
            RegexOptions options = RegexOptions.Multiline;

            Regex regex = new Regex($@"\[\[\b{ key }\b\]\]", options);
            return regex.Replace(body, repvalue);
        }
    }
}