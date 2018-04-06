using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Webmap_1A
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //SqlDependency.Start(ConfigurationManager.ConnectionStrings["Webmap_1AContext"].ConnectionString);
        }

        protected void Application_End()
        {
            //SqlDependency.Stop(ConfigurationManager.ConnectionStrings["Webmap_1AContext"].ConnectionString);
        }
    }
}
