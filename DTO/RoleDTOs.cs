namespace TinyTreats.DTO;

// DTO for role creation
public class RoleDto
{
    public string Name { get; set; }
}

// DTO for assigning a role to a user
public class UserRoleDto
{
    public string Email { get; set; }
    public string RoleName { get; set; }
}