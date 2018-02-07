using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Owin;
using Webmap_1A.Models;

namespace Webmap_1A.Controllers
{
    //[Authorize]
    public class MeController : ApiController
    {
        private ApplicationUserManager _userManager;
        private OrderService _orderService;

        public MeController()
        {
        }

        public MeController(ApplicationUserManager userManager, OrderService orderService)
        {
            UserManager = userManager;
            _orderService = orderService;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        
        public IEnumerable<Order> Get()
        {
            _orderService = new OrderService();
            return _orderService.GetOrders();
        }

        public void Post(Order newOrder)
        {
            try
            {
                _orderService = new OrderService();
                _orderService.AddOrder(newOrder);
            }
            catch (Exception e)
            {
                // TODO: log exception
                throw new HttpResponseException(System.Net.HttpStatusCode.InternalServerError);
            }
            
        }
    }
}