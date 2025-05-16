using System.ComponentModel.DataAnnotations;

namespace TinyTreats.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    [Range(0.01, 1000.00)]
    public decimal Price { get; set; }

    [Required]
    public bool IsAvailable { get; set; } = true;

    [MaxLength(255)]
    public string ImageUrl { get; set; }

    // Navigation property for order items
    public List<OrderItem> OrderItems { get; set; }
}