using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Webmap_1A.Models;

namespace Webmap_1A.Controllers
{
    [Authorize]
    public class WebmapController : Controller
    {
        
        //private readonly OrderService _orderService;

        public WebmapController()
        {
            //_orderService = new OrderService();
        }

        public ActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,Caller,PickFromAddress,TakeToAddress")] Order order)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Orders.Add(order);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return RedirectToAction("OrderForm");
        //}

        public ActionResult AddOrder()
        {
            return View();
        }

        public ActionResult EditOrder()
        {
            return View();
        }

        public ActionResult DeleteOrder()
        {
            return RedirectToAction("Index");
        }
    }
}