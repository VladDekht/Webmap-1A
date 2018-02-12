using System.ComponentModel.DataAnnotations;

namespace Webmap_1A.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public Caller Caller { get; set; }
        public Wrecker CurrentWrecker { get; set; }
        //[System.ComponentModel.DataAnnotations.]
        public Address PickFromAddress { get; set; }
        public Address TakeToAddress { get; set; }
        [Required]
        [Display(Name = "Other Info")]
        public string OtherInfo { get; set; }
    }
}