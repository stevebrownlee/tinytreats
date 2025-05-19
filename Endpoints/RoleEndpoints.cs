using Microsoft.AspNetCore.Identity;
using TinyTreats.DTO;
using Microsoft.EntityFrameworkCore;

namespace TinyTreats.Endpoints;

public static class RoleEndpoints
{
    public static void MapRoleEndpoints(this WebApplication app)
    {
        // Create a new role - Admin only
        app.MapPost("/roles", async (
            RoleDto roleDto,
            RoleManager<IdentityRole> roleManager) =>
        {
            // Check if the role already exists
            if (await roleManager.RoleExistsAsync(roleDto.Name))
            {
                return Results.BadRequest($"Role '{roleDto.Name}' already exists.");
            }

            // Create the role
            var result = await roleManager.CreateAsync(new IdentityRole(roleDto.Name));

            if (result.Succeeded)
            {
                return Results.Created($"/roles/{roleDto.Name}", new { name = roleDto.Name });
            }

            return Results.BadRequest(result.Errors);
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));

        // Get all roles - Admin only
        app.MapGet("/roles", async (RoleManager<IdentityRole> roleManager) =>
        {
            var roles = await roleManager.Roles.Select(r => r.Name).ToListAsync();
            return Results.Ok(roles);
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));

        // Assign a role to a user - Admin only
        app.MapPost("/users/roles", async (
            UserRoleDto userRoleDto,
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager) =>
        {
            // Find the user
            var user = await userManager.FindByEmailAsync(userRoleDto.Email);
            if (user == null)
            {
                return Results.NotFound($"User with email '{userRoleDto.Email}' not found.");
            }

            // Check if the role exists
            if (!await roleManager.RoleExistsAsync(userRoleDto.RoleName))
            {
                return Results.NotFound($"Role '{userRoleDto.RoleName}' not found.");
            }

            // Add the user to the role
            var result = await userManager.AddToRoleAsync(user, userRoleDto.RoleName);

            if (result.Succeeded)
            {
                return Results.NoContent();
            }

            return Results.BadRequest(result.Errors);
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));

        // Get roles for a user - Admin only
        app.MapGet("/users/{email}/roles", async (
            string email,
            UserManager<IdentityUser> userManager) =>
        {
            // Find the user
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Results.NotFound($"User with email '{email}' not found.");
            }

            // Get the user's roles
            var roles = await userManager.GetRolesAsync(user);

            return Results.Ok(roles);
        }).RequireAuthorization(policy => policy.RequireRole("Admin", "Baker"));

        // Remove a role from a user - Admin only
        app.MapDelete("/users/{email}/roles/{roleName}", async (
            string email,
            string roleName,
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager) =>
        {
            // Find the user
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Results.NotFound($"User with email '{email}' not found.");
            }

            // Check if the role exists
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                return Results.NotFound($"Role '{roleName}' not found.");
            }

            // Check if the user is in the role
            if (!await userManager.IsInRoleAsync(user, roleName))
            {
                return Results.BadRequest($"User '{email}' is not in role '{roleName}'.");
            }

            // Remove the user from the role
            var result = await userManager.RemoveFromRoleAsync(user, roleName);

            if (result.Succeeded)
            {
                return Results.NoContent();
            }

            return Results.BadRequest(result.Errors);
        }).RequireAuthorization(policy => policy.RequireRole("Admin"));
    }
}
