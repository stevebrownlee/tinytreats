using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TinyTreats.Data;
using TinyTreats.Models;
using TinyTreats.DTO;

namespace TinyTreats.Endpoints;

public static class AuthEndpoints
{
    // DTOs for registration and login
    public static void MapAuthEndpoints(this WebApplication app)
    {
        // Registration endpoint
        app.MapPost("/auth/register", async (
            RegistrationDto registration,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            TinyTreatsDbContext dbContext) =>
        {
            // Create a new Identity user
            var user = new IdentityUser
            {
                UserName = registration.Email,
                Email = registration.Email
            };

            // Try to create the user with the provided password
            var result = await userManager.CreateAsync(user, registration.Password);

            if (result.Succeeded)
            {
                // Create a UserProfile for the new user
                dbContext.UserProfiles.Add(new UserProfile
                {
                    FirstName = registration.FirstName,
                    LastName = registration.LastName,
                    Address = registration.Address,
                    IdentityUserId = user.Id
                });
                await dbContext.SaveChangesAsync();

                // Log the user in
                await signInManager.SignInAsync(user, isPersistent: false);
                return Results.Ok();
            }

            // If we get here, something went wrong
            return Results.BadRequest(result.Errors);
        });

        // Login endpoint
        app.MapPost("/auth/login", async (
            LoginDto login,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager) =>
        {
            // Find the user by email
            var user = await userManager.FindByEmailAsync(login.Email);

            if (user == null)
            {
                return Results.Unauthorized();
            }

            // Verify the password
            var result = await signInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (result.Succeeded)
            {
                // Sign in the user
                await signInManager.SignInAsync(user, isPersistent: false);
                return Results.Ok();
            }

            return Results.Unauthorized();
        });

        // Logout endpoint
        app.MapPost("/auth/logout", async (SignInManager<IdentityUser> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        });

        // Get current user info
        app.MapGet("/auth/me", (ClaimsPrincipal user, TinyTreatsDbContext dbContext) =>
        {
            // Get the user ID from the claims
            var identityUserId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (identityUserId == null)
            {
                return Results.Unauthorized();
            }

            // Find the user profile
            var profile = dbContext.UserProfiles
                .FirstOrDefault(up => up.IdentityUserId == identityUserId);

            if (profile == null)
            {
                return Results.NotFound();
            }

            // Return the user profile
            return Results.Ok(new
            {
                profile.Id,
                profile.FirstName,
                profile.LastName,
                profile.Address,
                Email = user.FindFirstValue(ClaimTypes.Email)
            });
        }).RequireAuthorization(); // This is a shorthand for requiring authentication
    }
}
