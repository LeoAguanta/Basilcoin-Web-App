using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BasilCoins.Helper
{
    public class AppSettings
    {

        public static string ConnectionString { get; set; }

        public static Encryption Encryption { get; set; }
        public static string MailServerEmail { get; set; }
        public static string MailServerUserName { get; set; }
        public static string MailServerPassword { get; set; }
        public static string SMTPHost { get; set; }
        public static string SystemJSVersion { get; set; }
        public static string ControllersJSVersion { get; set; }
        public static bool IsProduction { get; set; }

        public static void GetSection(IConfiguration section)
        {
            ConnectionString = section.GetValue<string>("ConnectionString");
            Encryption = section.GetSection("Encryption").Get<Encryption>();
            MailServerEmail = section.GetValue<string>("MailServerEmail");
            MailServerUserName = section.GetValue<string>("MailServerUserName");
            MailServerPassword = section.GetValue<string>("MailServerPassword");
            SMTPHost = section.GetValue<string>("SMTPHost");
            SystemJSVersion = section.GetValue<string>("SystemJSVersion");
            ControllersJSVersion = section.GetValue<string>("ControllersJSVersion");
            IsProduction = section.GetValue<bool>("IsProduction");

        }
              
    }

    public class Encryption
    {
        public string Key { get; set; }
        public string Salt { get; set; }
        public string UID { get; set; }
    }
}
