using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Webmap_1A.Models;

namespace Webmap_1A.Hubs
{
    public class WebmapHub : Hub
    {
        public static void SendLocation(int id, Location location)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<WebmapHub>();
            context.Clients.All.SendLocation(id, location);
        }
    }
}