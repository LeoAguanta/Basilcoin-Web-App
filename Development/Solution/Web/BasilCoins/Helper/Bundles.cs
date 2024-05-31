using BasilCoins.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using NUglify.JavaScript;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebOptimizer;

namespace BasilCoins.Controllers
{
    public class Bundles
    {

        private IHostingEnvironment host;
        private string JSFolder { get; set; } = "Scripts/References/";

        private string JSSystemFolder { get; set; } = "Scripts/System/";

        private string JSControllersFolder { get; set; } = "App/Controllers/";

        private string CSSFolder { get; set; } = "Styles/References/";
        

        public Bundles(IHostingEnvironment hostingEnvironment)
        {
            this.host = hostingEnvironment;
        }

        public void Bundle(IAssetPipeline bundles)
        {

            bundles.AddJavaScriptBundle("/bundles/gen", SetGenericScripts()).Concatenate();
            bundles.AddJavaScriptBundle("/bundles/ng", SetAngularScripts()).Concatenate();

            bundles.AddJavaScriptBundle($"/bundles/sys{AppSettings.SystemJSVersion}", SetSystemModule()).Concatenate();
            bundles.AddJavaScriptBundle($"/bundles/ctrl{AppSettings.ControllersJSVersion}", SetControllerScripts()).Concatenate();

            bundles.AddCssBundle("/bundles/reference-styles", SetCSSStyles()).MinifyCss();
            bundles.AddCssBundle("/MasterCss", "Styles/System/Master.min.css");
        }

        private string[] SetGenericScripts()
        {
            string[] JsGenericScripts = new string[] {
            $"{JSFolder}jquery.min.js",
            $"{JSFolder}linq.min.js",
            $"{JSFolder}lz-string.min.js",
            $"{JSFolder}moment.min.js",
            $"{JSFolder}nickcrypt.js",
            $"{JSFolder}base64js.min.js",
            $"{JSFolder}bootstrap.bundle.min.js",
            $"{JSFolder}signalr.min.js",
            $"{JSFolder}sha1.min.js",
            $"{JSFolder}wow.min.js",
            };
            return JsGenericScripts;
        }

        private string[] SetAngularScripts()
        {
            string[] JsAngularScripts = new string[] {
            $"{JSFolder}angular.min.js",
            $"{JSFolder}angular-animate.min.js",
            $"{JSFolder}angular-cookies.min.js",
            $"{JSFolder}angular-sanitize.min.js",
            $"{JSFolder}router-extras.min.js",
            $"{JSFolder}ui-bootstrap-tpls.min.js",
            $"{JSFolder}angular-ui-router.min.js"
            };
            return JsAngularScripts;
        }


        private string[] SetSystemModule()
        {
            string[] SetSystemModule = new string[] {
                $"{JSSystemFolder}App.js",
                $"{JSSystemFolder}config.js",
                $"{JSSystemFolder}directives.js",
                $"{JSSystemFolder}BaseController.js",
                $"{JSSystemFolder}providers.js"
            };

            return SetSystemModule;
        }

        private string[] SetControllerScripts()
        {
            DirectoryInfo objDirectoryInfo = new DirectoryInfo(Path.Combine(host.WebRootPath, JSControllersFolder));
            string[] allFiles = objDirectoryInfo.GetFiles("*.js", SearchOption.AllDirectories).Select(x => x.FullName.Replace(host.WebRootPath, "")).ToArray();

            return allFiles;
        }


        private string[] SetCSSStyles()
        {
            string[] CssStyles = new string[] {
                $"{CSSFolder}bootstrap.min.css",
                $"{CSSFolder}fontawesome.min.css",
                $"{CSSFolder}brands.min.css",
                $"{CSSFolder}solid.min.css",
                $"{CSSFolder}animate.css",
            };
            return CssStyles;
        }
    }
}
