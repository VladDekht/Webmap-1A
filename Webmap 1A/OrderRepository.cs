using System.Collections.Generic;
using Webmap_1A.Models;

namespace Webmap_1A
{
    public class OrderRepository
    {
        private static List<Order> _orders;

        public OrderRepository()
        {
            _orders = new List<Order>{ new Order { Lat = 55F, Lng = 27.56667F, Id = 0 } };
        }

        public List<Order> GetOrders()
        {
            return _orders;
        }

        public Order GetOrder(int id)
        {
            return _orders.Find(f => f.Id == id);
        }

        public void AddOrder(Order order)
        {
            _orders.Add(order);
        }
    }
}