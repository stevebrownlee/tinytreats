using Microsoft.AspNetCore.Identity;

namespace TinyTreats.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }

    // This connects to the ASP.NET Core Identity user
    public string IdentityUserId { get; set; }
    public IdentityUser? IdentityUser { get; set; }

    // Navigation property for orders
    public List<Order> Orders { get; set; }
}