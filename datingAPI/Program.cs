using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using datingAPI.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace datingAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();

            if (args.Length > 0 && args[0] == "--seed") {
                using (IServiceScope scope = host.Services.CreateScope())
                {
                    IServiceProvider svcs = scope.ServiceProvider;
                    DataContext dbCtx = svcs.GetRequiredService<DataContext>();
                    Seeder seeder = new Seeder(dbCtx);
                    seeder.SeedUsers();
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
