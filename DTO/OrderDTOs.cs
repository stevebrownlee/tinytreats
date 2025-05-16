namespace TinyTreats.DTO;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string Status { get; set; }
    public int UserProfileId { get; set; }
    public string CustomerName { get; set; }
    public List<OrderItemDto> Items { get; set; }
    public decimal TotalAmount { get; set; }
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal ProductPrice { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}

public class OrderCreateDto
{
    public List<OrderItemCreateDto> Items { get; set; }
}

public class OrderItemCreateDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class OrderStatusUpdateDto
{
    public required string Status { get; set; }
}