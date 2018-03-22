using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using Webmap_1A.Models;
using System.Web.Http.Results;
using System.Net;
using System;
using System.Net.Http;
using System.Data.Entity;
using System.Collections.Generic;
using Webmap_1A.Hubs;

namespace Webmap_1A.Controllers
{

    //[Authorize]
    public class MeController : ApiController
    {
        private ApplicationUserManager _userManager;
        private OrderService _orderService;
        //private WreckersRepository _wreckersRepo = new WreckersRepository();


        public MeController()
        {
        }

        public MeController(ApplicationUserManager userManager, OrderService orderService)
        {
            UserManager = userManager;
            _orderService = orderService;
        }


        [Route("~/api/me/ShowOrders")]
        [HttpGet]
        public JsonResult<Order[]> GetOrders()
        {
            Webmap_1AContext ordersContext = new Webmap_1AContext();
            var orders = ordersContext.Orders.ToArray();//ToListAsync().Result.ToDataTable();
            return Json(orders);//Json(DataTableToJSON(orders));//, JsonRequestBehavior.AllowGet);
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

        [Route("api/me/GetWreckers")]
        [HttpGet]
        public JsonResult<List<Wrecker>> GetWreckers()
        {
            Webmap_1AContext wreckersContext = new Webmap_1AContext();
            return Json(wreckersContext.Wreckers.ToList());
        }

        [Route("api/me/{id:int}/GetWreckerById")]
        [HttpGet]
        public JsonResult<Wrecker> GetWreckerById(int id)
        {
            Webmap_1AContext wreckersContext = new Webmap_1AContext();
            Wrecker wrecker = wreckersContext.Wreckers.Find(id);
            return Json(wrecker);
        }

        [Route("api/me/{id:int}/SetWreckerLocation")]
        [HttpPost]
        public void SetWreckerLocation(int id, [FromBody]Location loc)
        {
            Webmap_1AContext wreckersContext = new Webmap_1AContext();
            Wrecker wreckerToChange = wreckersContext.Wreckers.Find(id);

            wreckerToChange.CurrentLocation.Lat = loc.Lat;
            wreckerToChange.CurrentLocation.Lng = loc.Lng;

            WebmapHub.SendLocation(id, loc);

            wreckersContext.SaveChanges();
        }

        [Route("api/me/orders")]
        [HttpPost]
        public void Post(Order newOrder)
        {
            if (ModelState.IsValid)
            {
                try
                {
                
                    _orderService = new OrderService();
                    _orderService.AddOrder(newOrder);

                     //var message = Request.CreateResponse(HttpStatusCode.Created, newOrder);
                     //message.Headers.Location = new Uri(Request.RequestUri + newOrder.Id.ToString());
                     //return message;
                
                }
                catch (Exception ex)
                {
                    //return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                }
            }
            //return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        [Route("~/api/me/{id:int}/setstatus")]
        [HttpPost]
        public HttpResponseMessage PostStatus(int id, [FromBody]string status)
        {
            Webmap_1AContext ordersContext = new Webmap_1AContext();
            Order orderToChange = (Order) ordersContext.Orders.Find(id);
            if (orderToChange != null)
            {
                try
                {
                    Enum.TryParse(status, out Order.OrderStatus st);
                    orderToChange.CurrentStatus = st;
                    ordersContext.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.OK, orderToChange);
                    message.Headers.Location = new Uri(Request.RequestUri.ToString());
                    return message;
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
                }
            }
            return null;
        }


        //public void SaveLocation(Wrecker wr)
        //{
        //    // save async in BD
        //    // send SignalR clients
        //}
    }
}