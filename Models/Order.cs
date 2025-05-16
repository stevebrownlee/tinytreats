using System.ComponentModel.DataAnnotations;

namespace TinyTreats.Models;

public class Order
{
    public int Id { get; set; }

    [Required]
    public DateTime OrderDate { get; set; }

    public DateTime? DeliveryDate { get; set; }

    [Required]
    public string Status { get; set; } // "Pending", "Preparing", "Ready", "Delivered"

    [Required]
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }

    public List<OrderItem> OrderItems { get; set; }

    public decimal TotalAmount => OrderItems?.Sum(item => item.Quantity * item.Product.Price) ?? 0;
}