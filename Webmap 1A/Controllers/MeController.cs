using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Microsoft.AspNet.Identity.Owin;
using Webmap_1A.Models;
using System.Data.Entity;
using System.Web.Http.Results;

namespace Webmap_1A.Controllers
{

    //[Authorize]
    public class MeController : ApiController
    {
        //private static readonly string connectionString = ConfigurationManager.ConnectionStrings["ConnStringDb1"].ConnectionString;
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
        [System.Web.Http.HttpGet]
        public JsonResult<Order[]> ShowOrders()
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


        //public IEnumerable<Order> Get()
        //{
        //    _orderService = new OrderService();
        //    return _orderService.GetOrders();
        //}

        //[System.Web.Http.HttpGet]
        //public JsonResult GetAllUser(int Id)
        //{
        //    List<Order> orders = new List<Order>();
        //    string query = string.Format("Select * From Orders", Id);
        //    SqlConnection connection = new SqlConnection(connectionString);
        //    {
        //        using (SqlCommand cmd = new SqlCommand(query, connection))
        //        {
        //            connection.Open();
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            while (reader.Read())
        //            {
        //                orders.Add(
        //                    new Order
        //                    {
        //                        Id = int.Parse(reader["Id"].ToString()),
        //                        Caller = (Caller) reader["Caller"],
        //                        CurrentWrecker = (Wrecker) reader["CurrentWrecker"],
        //                        PickFromAddress = (Address) reader["Address"],
        //                        TakeToAddress = (Address) reader["Address"],
        //                        OtherInfo = reader["OtherInfo"].ToString()
        //                    }
        //                );
        //            }
        //        }
        //        return Json(orders, JsonRequestBehavior.AllowGet);
        //    }
        //}
        [System.Web.Http.HttpPost]
        public void Post(Order newOrder)
        {

            if (ModelState.IsValid)
            {
                //try
                //{
                    _orderService = new OrderService();
                    _orderService.AddOrder(newOrder);
                //}
                //catch (Exception e)
                //{
                //    // TODO: log exception
                //    throw new HttpResponseException(System.Net.HttpStatusCode.InternalServerError);
                //}
            }

        }
    }
}