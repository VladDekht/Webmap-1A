using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webmap_1A.Models;
using Webmap_1A.Services;

namespace Webmap_1A
{
    public class OrderRepository
    {
        private static List<Order> _orders;

        public OrderRepository()
        {
            //_orders = new List<Order>{ new Order { Lat = 55F, Lng = 27.56667F, Id = 0 } };
        }

        public IEnumerable<Order> GetOrders()
        {
            using (var db = new DataAccessService())
            {
                return db.Orders.ToList();
            }
        }

        public async Task<Order> GetOrder(int id)
        {
            return await Task.Run(()=> _orders.FirstOrDefault(f => f.Id == id));
        }

        public void AddOrder(Order order)
        {
            _orders.Add(order);
        }
    }
}