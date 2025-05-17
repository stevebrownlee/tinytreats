using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TinyTreats.Data;
using TinyTreats.DTO;
using TinyTreats.Models;

namespace TinyTreats.Endpoints;

public static class OrderEndpoints
{
    public static void MapOrderEndpoints(this WebApplication app)
    {
        // Get all orders - Admin can see all, Baker can see all, Customer can see only their own
        app.MapGet("/orders", async (
            ClaimsPrincipal user,
            UserManager<IdentityUser> userManager,
            TinyTreatsDbContext dbContext) =>
        {
            // Get the current user's ID
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            // Check if the user is an admin or baker
            bool isAdmin = user.IsInRole("Admin");
            bool isBaker = user.IsInRole("Baker");

            // Get the user's profile
            var userProfile = await dbContext.UserProfiles
                .FirstOrDefaultAsync(up => up.IdentityUserId == userId);

            if (userProfile == null)
            {
                return Results.NotFound("User profile not found");
            }

            // Query orders based on role
            IQueryable<Order> ordersQuery = dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.UserProfile);

            if (!isAdmin && !isBaker)
            {
                // Customers can only see their own orders
                ordersQuery = ordersQuery.Where(o => o.UserProfileId == userProfile.Id);
            }

            var orders = await ordersQuery.ToListAsync();

            // Map to DTOs
            var orderDtos = orders.Select(o => new OrderDto
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                DeliveryDate = o.DeliveryDate,
                Status = o.Status,
                UserProfileId = o.UserProfileId,
                CustomerName = $"{o.UserProfile.FirstName} {o.UserProfile.LastName}",
                Items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    ProductPrice = oi.Product.Price,
                    Quantity = oi.Quantity,
                    Subtotal = oi.Quantity * oi.Product.Price
                }).ToList(),
                TotalAmount = o.TotalAmount
            }).ToList();

            return Results.Ok(orderDtos);
        }).RequireAuthorization();

        // Get order by ID - Admin can see any, Baker can see any, Customer can see only their own
        app.MapGet("/orders/{id}", async (
            int id,
            ClaimsPrincipal user,
            UserManager<IdentityUser> userManager,
            TinyTreatsDbContext dbContext) =>
        {
            // Get the current user's ID
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            // Check if the user is an admin or baker
            bool isAdmin = user.IsInRole("Admin");
            bool isBaker = user.IsInRole("Baker");

            // Get the order with related data
            var order = await dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.UserProfile)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return Results.NotFound();
            }

            // Check if the user has permission to view this order
            if (!isAdmin && !isBaker)
            {
                // Get the user's profile
                var userProfile = await dbContext.UserProfiles
                    .FirstOrDefaultAsync(up => up.IdentityUserId == userId);

                if (userProfile == null || order.UserProfileId != userProfile.Id)
                {
                    return Results.NotFound(); // Use NotFound instead of Forbidden for security
                }
            }

            // Map to DTO
            var orderDto = new OrderDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = order.Status,
                UserProfileId = order.UserProfileId,
                CustomerName = $"{order.UserProfile.FirstName} {order.UserProfile.LastName}",
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    ProductPrice = oi.Product.Price,
                    Quantity = oi.Quantity,
                    Subtotal = oi.Quantity * oi.Product.Price
                }).ToList(),
                TotalAmount = order.TotalAmount
            };

            return Results.Ok(orderDto);
        }).RequireAuthorization();

        // Create a new order - Any authenticated user
        app.MapPost("/orders", async (
            OrderCreateDto orderDto,
            ClaimsPrincipal user,
            UserManager<IdentityUser> userManager,
            TinyTreatsDbContext dbContext) =>
        {
            // Get the current user's ID
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            // Get the user's profile
            var userProfile = await dbContext.UserProfiles
                .FirstOrDefaultAsync(up => up.IdentityUserId == userId);

            if (userProfile == null)
            {
                return Results.NotFound("User profile not found");
            }

            // Validate that all products exist and are available
            var productIds = orderDto.Items.Select(i => i.ProductId).ToList();
            var products = await dbContext.Products
                .Where(p => productIds.Contains(p.Id) && p.IsAvailable)
                .ToDictionaryAsync(p => p.Id, p => p);

            // Check if all products were found and are available
            if (products.Count != productIds.Count)
            {
                return Results.BadRequest("One or more products are not available");
            }

            // Create the order
            var order = new Order
            {
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                UserProfileId = userProfile.Id,
                OrderItems = orderDto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity
                }).ToList()
            };

            dbContext.Orders.Add(order);
            await dbContext.SaveChangesAsync();

            // Reload the order with related data
            order = await dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.UserProfile)
                .FirstOrDefaultAsync(o => o.Id == order.Id);

            // Map to DTO
            var createdOrderDto = new OrderDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                DeliveryDate = order.DeliveryDate,
                Status = order.Status,
                UserProfileId = order.UserProfileId,
                CustomerName = $"{order.UserProfile.FirstName} {order.UserProfile.LastName}",
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product.Name,
                    ProductPrice = oi.Product.Price,
                    Quantity = oi.Quantity,
                    Subtotal = oi.Quantity * oi.Product.Price
                }).ToList(),
                TotalAmount = order.TotalAmount
            };

            return Results.Created($"/orders/{order.Id}", createdOrderDto);
        }).RequireAuthorization();

        // Update order status - Only Bakers and Admins
        app.MapPatch("/orders/{id}/status", async (
            int id,
            OrderStatusUpdateDto statusDto,
            TinyTreatsDbContext dbContext) =>
        {
            var order = await dbContext.Orders.FindAsync(id);
            if (order == null)
            {
                return Results.NotFound();
            }

            // Validate the status
            if (!new[] { "Pending", "Preparing", "Ready", "Delivered" }.Contains(statusDto.Status))
            {
                return Results.BadRequest("Invalid status");
            }

            order.Status = statusDto.Status;

            // If the order is delivered, set the delivery date
            if (statusDto.Status == "Delivered")
            {
                order.DeliveryDate = DateTime.UtcNow;
            }

            await dbContext.SaveChangesAsync();
            return Results.NoContent();
        }).RequireAuthorization(policy => policy.RequireRole("Baker", "Admin"));

        // Cancel an order - Admin can cancel any, Customer can cancel only their own pending orders
        app.MapDelete("/orders/{id}", async (
            int id,
            ClaimsPrincipal user,
            UserManager<IdentityUser> userManager,
            TinyTreatsDbContext dbContext) =>
        {
            // Get the current user's ID
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Results.Unauthorized();
            }

            // Check if the user is an admin
            bool isAdmin = user.IsInRole("Admin");

            // Get the order
            var order = await dbContext.Orders.FindAsync(id);
            if (order == null)
            {
                return Results.NotFound();
            }

            // Check if the user has permission to cancel this order
            if (!isAdmin)
            {
                // Get the user's profile
                var userProfile = await dbContext.UserProfiles
                    .FirstOrDefaultAsync(up => up.IdentityUserId == userId);

                if (userProfile == null || order.UserProfileId != userProfile.Id)
                {
                    return Results.NotFound(); // Use NotFound instead of Forbidden for security
                }

                // Customers can only cancel pending orders
                if (order.Status != "Pending")
                {
                    return Results.BadRequest("Only pending orders can be canceled");
                }
            }

            // Delete the order items first
            var orderItems = await dbContext.OrderItems
                .Where(oi => oi.OrderId == id)
                .ToListAsync();

            dbContext.OrderItems.RemoveRange(orderItems);

            // Then delete the order
            dbContext.Orders.Remove(order);
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization();
    }
}