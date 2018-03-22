using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Webmap_1A.Startup))]

namespace Webmap_1A
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            ConfigureAuth(app);
        }
    }
}
