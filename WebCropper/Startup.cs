using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebCropper.Startup))]
namespace WebCropper
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
