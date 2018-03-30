using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Mvc;

namespace Webmap_1A.Models
{
    [Table("Orders")]
    public class Order
    {
        public enum OrderStatus { Pending, InProcess, Cancelled, Done }
        [Key]
        public int Id { get; set; }
        public OrderStatus CurrentStatus { get; set; }
        public Caller Caller { get; set; }
        public Wrecker CurrentWrecker { get; set; }
        //[System.ComponentModel.DataAnnotations.]
        public Address PickFromAddress { get; set; }
        public Address TakeToAddress { get; set; }
        public string OtherInfo { get; set; }
    }
}