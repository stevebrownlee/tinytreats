namespace TinyTreats.DTO;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public string ImageUrl { get; set; }
}

public class ProductCreateDto
{
    public required string Name { get; set; }
    public string Description { get; set; }
    public required decimal Price { get; set; }
    public bool IsAvailable { get; set; } = true;
    public string ImageUrl { get; set; }
}

public class ProductUpdateDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal? Price { get; set; }
    public bool? IsAvailable { get; set; }
    public string ImageUrl { get; set; }
}