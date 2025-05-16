using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TinyTreats.Data;
using TinyTreats.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Configure database
builder.Services.AddDbContext<TinyTreatsDbContext>(options =>
    options.UseNpgsql(builder.Configuration["TinyTreatsDbConnectionString"]));

// Configure Identity
builder.Services.AddIdentityCore<IdentityUser>(options =>
{
    // Password requirements
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
})
.AddRoles<IdentityRole>() // Add role management
.AddEntityFrameworkStores<TinyTreatsDbContext>() // Use our DbContext
.AddSignInManager(); // Add SignInManager

// Configure authentication with cookies
builder.Services.AddAuthentication("Identity.Application")
    .AddCookie("Identity.Application", options =>
    {
        options.Cookie.Name = "TinyTreatsAuth";
        options.Cookie.HttpOnly = true; // Prevent JavaScript access to the cookie
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // Allow both HTTP and HTTPS in development
        options.Events = new CookieAuthenticationEvents
        {
            OnRedirectToLogin = context =>
            {
                // Instead of redirecting to login page, return 401 Unauthorized for API requests
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            },
            OnRedirectToAccessDenied = context =>
            {
                // Instead of redirecting to access denied page, return 403 Forbidden for API requests
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return Task.CompletedTask;
            }
        };
    });

// Configure authorization policies
builder.Services.AddAuthorization(options =>
{
    // Add a policy for bakery staff (Admin or Baker)
    options.AddPolicy("BakeryStaff", policy =>
        policy.RequireRole("Admin", "Baker"));
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // React and Vite default ports
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Allow credentials (cookies)
    });
});

// Add services for Swagger
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    // Development-specific middleware
    app.UseDeveloperExceptionPage();
}

// Ensure that HTTPS protocol is used
app.UseHttpsRedirection();

// Use CORS middleware
app.UseCors("AllowLocalhost");

// Add authentication middleware
app.UseAuthentication();
app.UseAuthorization();

// Map API endpoints
app.MapAuthEndpoints();
app.MapRoleEndpoints();
app.MapProductEndpoints();
app.MapOrderEndpoints();

// Add a simple health check endpoint
app.MapGet("/", () => "TinyTreats API is running!");

app.Run();