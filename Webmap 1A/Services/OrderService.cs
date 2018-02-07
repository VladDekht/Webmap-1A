using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Webmap_1A.Models;

namespace Webmap_1A
{
    public class OrderService
    {
        private readonly OrderRepository _orderRepository;

        public OrderService()
        {
            _orderRepository = new OrderRepository();
        }

        public IEnumerable<Order> GetOrders()
        {
            return _orderRepository.GetOrders();
        }

        public void AddOrder(Order order)
        {
            _orderRepository.AddOrder(order);
        }
    }
}