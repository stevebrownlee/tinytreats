using Microsoft.EntityFrameworkCore;
using TinyTreats.Data;
using TinyTreats.DTO;
using TinyTreats.Models;

namespace TinyTreats.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this WebApplication app)
    {
        // Get all products - Public
        app.MapGet("/products", async (TinyTreatsDbContext dbContext) =>
        {
            var products = await dbContext.Products
                .Where(p => p.IsAvailable)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    IsAvailable = p.IsAvailable,
                    ImageUrl = p.ImageUrl
                })
                .ToListAsync();

            return Results.Ok(products);
        });

        // Get product by ID - Public
        app.MapGet("/products/{id}", async (int id, TinyTreatsDbContext dbContext) =>
        {
            var product = await dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return Results.NotFound();
            }

            // Only return available products to the public
            if (!product.IsAvailable)
            {
                return Results.NotFound();
            }

            return Results.Ok(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                IsAvailable = product.IsAvailable,
                ImageUrl = product.ImageUrl
            });
        });

        // Get all products (including unavailable) - Admin only
        app.MapGet("/admin/products", async (TinyTreatsDbContext dbContext) =>
        {
            var products = await dbContext.Products
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    IsAvailable = p.IsAvailable,
                    ImageUrl = p.ImageUrl
                })
                .ToListAsync();

            return Results.Ok(products);
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));

        // Create a new product - Admin or Baker role required
        app.MapPost("/products", async (
            ProductCreateDto productDto,
            TinyTreatsDbContext dbContext) =>
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                IsAvailable = productDto.IsAvailable,
                ImageUrl = productDto.ImageUrl
            };

            dbContext.Products.Add(product);
            await dbContext.SaveChangesAsync();

            return Results.Created($"/products/{product.Id}", new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                IsAvailable = product.IsAvailable,
                ImageUrl = product.ImageUrl
            });
        }).RequireAuthorization(policy => policy.RequireRole("Admin", "Baker"));

        // Update a product - Admin only
        app.MapPut("/products/{id}", async (
            int id,
            ProductUpdateDto productDto,
            TinyTreatsDbContext dbContext) =>
        {
            var product = await dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return Results.NotFound();
            }

            // Update only the properties that are provided
            if (productDto.Name != null)
            {
                product.Name = productDto.Name;
            }

            if (productDto.Description != null)
            {
                product.Description = productDto.Description;
            }

            if (productDto.Price.HasValue)
            {
                product.Price = productDto.Price.Value;
            }

            if (productDto.IsAvailable.HasValue)
            {
                product.IsAvailable = productDto.IsAvailable.Value;
            }

            if (productDto.ImageUrl != null)
            {
                product.ImageUrl = productDto.ImageUrl;
            }

            await dbContext.SaveChangesAsync();

            return Results.Ok(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                IsAvailable = product.IsAvailable,
                ImageUrl = product.ImageUrl
            });
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));

        // Delete a product - Admin only
        app.MapDelete("/products/{id}", async (
            int id,
            TinyTreatsDbContext dbContext) =>
        {
            var product = await dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return Results.NotFound();
            }

            // Check if the product is referenced by any order items
            var hasOrderItems = await dbContext.OrderItems
                .AnyAsync(oi => oi.ProductId == id);

            if (hasOrderItems)
            {
                // Instead of deleting, mark as unavailable
                product.IsAvailable = false;
                await dbContext.SaveChangesAsync();
                return Results.Ok(new { message = "Product marked as unavailable because it has order references." });
            }

            // If no order items reference this product, we can safely delete it
            dbContext.Products.Remove(product);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));
    }
}