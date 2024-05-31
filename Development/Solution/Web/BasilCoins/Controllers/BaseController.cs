using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BasilCoins.Helper;
using BasilCoins.Models;
using LZStringCSharp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Nullib.Dapper;
using Nullib.Helpers;
using z.Data;

namespace BasilCoins.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : Controller
    {
        public SQLServer sql { get; set; }
        public HttpContext Context { get; private set; }
        public Pair Q { get; set; }
        public static string dir { get; set; }
        public static BrowserSession Session { get; set; }



        public BaseController()
        {

            using (var s = new SQLServer(AppSettings.ConnectionString))
            {
                this.sql = s;
            };
        }


        protected string ReplaceCode(string body, string key, string repvalue)
        {
            RegexOptions options = RegexOptions.Multiline;

            Regex regex = new Regex($@"\[\[\b{ key }\b\]\]", options);
            return regex.Replace(body, repvalue);
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {

            try
            {
                Context = context.HttpContext;
                
                Session =  Context.Session.GetString("session") != null ? JsonConvert.DeserializeObject<BrowserSession>(Context.Session.GetString("session")) : null;
                

                using (var ms = new MemoryStream())
                {
                    if (Context.Request.ContentLength > 0)
                    {
                        Context.Request.Body.CopyTo(ms);
                        
                        ms.Seek(0, SeekOrigin.Begin);
                        using (var sr = new StreamReader(ms))
                        {

                            var _param = sr.ReadToEnd();

                            Q = CryptoJS.Decrypt(LZString.DecompressFromBase64(Uri.UnescapeDataString(_param)), AppSettings.Encryption.Key, AppSettings.Encryption.Salt).ToObject<Pair>();
                        }
                    }
                    else if (Context.Request.Method == "GET")
                    {
                        
                        Q = new Pair();
                        foreach (var dd in context.HttpContext.Request.Query)
                        {
                            Q.Add(dd.Key, CryptoJS.Decrypt(LZString.DecompressFromBase64(Uri.UnescapeDataString(dd.Value.ToString())), AppSettings.Encryption.Key, AppSettings.Encryption.Salt).ToString());
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public async Task SendMail(string mName, string mSubject, string mBody, string mTo, string attch = null)
        {
            try
            {

                var fromAddress = new MailAddress(AppSettings.MailServerEmail, AppSettings.MailServerUserName);
                var smtp = new SmtpClient
                {
                    Host = AppSettings.SMTPHost,
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(AppSettings.MailServerEmail, AppSettings.MailServerPassword),
                    Timeout = 20000
                };

                using (var message = new MailMessage(fromAddress, new MailAddress(mTo, mName))
                {
                    Subject = mSubject,
                    Body = mBody,
                    IsBodyHtml = true
                })
                {
                    if (attch != null)
                        message.Attachments.Add(new Attachment(attch));
                    
                    message.Bcc.Add(sql.ExecQuery("Select Value From tsetting where code = 'CCEmail'").FirstOrDefault()["Value"].ToString());

                    await smtp.SendMailAsync(message);
                }

                smtp.Dispose();

                if (attch != null)
                    System.IO.File.Delete(attch);
                
            }
            catch (Exception e)
            {
                if (attch != null)
                    System.IO.File.Delete(attch);
                
                throw e;
             
            }
        }


    }
}