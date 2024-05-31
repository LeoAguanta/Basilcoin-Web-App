using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BasilCoins.Helper;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BasilCoins
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {

            var CurrentDirectory = Directory.GetCurrentDirectory();

            var builder = new ConfigurationBuilder()
                         .SetBasePath(CurrentDirectory)
                         .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            var Configuration = builder.Build();

            AppSettings.GetSection(Configuration.GetSection("AppSettings"));

            return WebHost.CreateDefaultBuilder(args)
                 .UseContentRoot(CurrentDirectory)
                 .UseIISIntegration()
                 .ConfigureAppConfiguration((hostingContext, config) =>
                 {
                     var env = hostingContext.HostingEnvironment;
                     config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                     config.AddEnvironmentVariables();
                 })
                 .UseStartup<Startup>();
        }
    }
}
