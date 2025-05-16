using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TinyTreats.Migrations
{
    /// <inheritdoc />
    public partial class MoreSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", null, "Customer", "CUSTOMER" },
                    { "c7b013f0-5201-4317-abd8-c211f91b7330", null, "Baker", "BAKER" },
                    { "fab4fac1-c546-41de-aebc-a14da6895711", null, "Admin", "ADMIN" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4fb776c4-d77e-4c6b-9152-9ba87b26a41b", "AQAAAAIAAYagAAAAEEhI3Sm8u7HDM87IF/iJbCmoUspr2rM0gQXTpqvVwfpQseyxUd4BoisdaI4FiADTZQ==", "e520ed15-1d8b-4a7f-8d12-f21a01ddccac" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "a1ffd800-9189-4a69-a24a-9b8c094f12a5", 0, "a5217f52-5f47-42ae-ba5b-ca3ba6e7e456", "baker2@tinytreats.com", true, false, null, "BAKER2@TINYTREATS.COM", "BAKER2@TINYTREATS.COM", "AQAAAAIAAYagAAAAEBqK+s1Pzo/8Ti90vSznlSrawGfS3HIs+Rzc5arZooN8Cb51YMgb91peOCOUeTtMLQ==", null, false, "651e3a09-01b2-47dd-95b8-f7002aae29ca", false, "baker2@tinytreats.com" },
                    { "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a", 0, "854a0fec-276b-4e02-bb71-bbde32068afb", "customer1@example.com", true, false, null, "CUSTOMER1@EXAMPLE.COM", "CUSTOMER1@EXAMPLE.COM", "AQAAAAIAAYagAAAAEE+y4DiwsG2WwRoaerPMTYhuf31fQblIarBninYgWwBdvEEBiQuqq/LJJAInhd9x1Q==", null, false, "b6495448-2b1e-492b-a7e1-015d34080039", false, "customer1@example.com" },
                    { "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b", 0, "d4208ae8-3d45-4723-ba41-ed46eff5bbf3", "customer2@example.com", true, false, null, "CUSTOMER2@EXAMPLE.COM", "CUSTOMER2@EXAMPLE.COM", "AQAAAAIAAYagAAAAELE8sr5Y0PoqcpMkGFSiTht+5UWGbV3T+GR+umRsvMTudXh9H7KbWBa0vuNBRN53FA==", null, false, "ec1f876d-5b4c-447d-9e50-5fb7981a9d1e", false, "customer2@example.com" },
                    { "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c", 0, "18e0e7ff-ccc5-48ae-9bdb-2db9fffedfde", "customer3@example.com", true, false, null, "CUSTOMER3@EXAMPLE.COM", "CUSTOMER3@EXAMPLE.COM", "AQAAAAIAAYagAAAAEAR86BRI0YXuCyhHhiZF5rcsd8G5FlxZw3Eo80GKaZ8czYXX80WhWtJAYvG+SEuhSw==", null, false, "005b417d-e7fe-453a-a269-5b6acad7915f", false, "customer3@example.com" },
                    { "e2cfe4e6-5437-4efb-9a66-8d1371796bda", 0, "80b48ed3-e2dd-4091-8021-bd24ea9d45e2", "baker1@tinytreats.com", true, false, null, "BAKER1@TINYTREATS.COM", "BAKER1@TINYTREATS.COM", "AQAAAAIAAYagAAAAEBsPKisJg2q7wa0xDx3o8SeakxM6IYKmhp85EFe6i7hoi/PdX8g1l9BTEUfVdxgYxg==", null, false, "c8d9616c-39cf-4937-8372-3e7c1f6db659", false, "baker1@tinytreats.com" },
                    { "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d", 0, "f7f4f54e-21e2-478f-a4da-f937bc2b17da", "customer4@example.com", true, false, null, "CUSTOMER4@EXAMPLE.COM", "CUSTOMER4@EXAMPLE.COM", "AQAAAAIAAYagAAAAEGARNvl9fg+x6d97zK2hERdirfqNu5G0+WjRcE49LxrBrAqWrP42peIUGNLlV8rEVA==", null, false, "9f373bfb-dc86-45b5-81e6-4485f3bcf2d6", false, "customer4@example.com" },
                    { "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e", 0, "884f6309-00a9-4a86-b3bf-6d5ced6c0f26", "customer5@example.com", true, false, null, "CUSTOMER5@EXAMPLE.COM", "CUSTOMER5@EXAMPLE.COM", "AQAAAAIAAYagAAAAEPCcE+cpqxiiryRLMSbXKd8Lx7QUASECov+zyGWp3yz09iC1NLeX/gObcEa17tghwg==", null, false, "a44a3552-5c6b-4179-8045-b94ca0520187", false, "customer5@example.com" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c7b013f0-5201-4317-abd8-c211f91b7330", "a1ffd800-9189-4a69-a24a-9b8c094f12a5" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c" },
                    { "fab4fac1-c546-41de-aebc-a14da6895711", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" },
                    { "c7b013f0-5201-4317-abd8-c211f91b7330", "e2cfe4e6-5437-4efb-9a66-8d1371796bda" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "LastName" },
                values: new object[,]
                {
                    { 2, "456 Pastry Ave", "Jane", "e2cfe4e6-5437-4efb-9a66-8d1371796bda", "Baker" },
                    { 3, "789 Cupcake Blvd", "John", "a1ffd800-9189-4a69-a24a-9b8c094f12a5", "Dough" },
                    { 4, "101 Sweet St", "Alice", "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a", "Johnson" },
                    { 5, "202 Dessert Dr", "Bob", "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b", "Smith" },
                    { 6, "303 Frosting Ln", "Carol", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c", "Williams" },
                    { 7, "404 Cookie Ct", "David", "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d", "Brown" },
                    { 8, "505 Muffin Ave", "Emma", "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e", "Davis" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "c7b013f0-5201-4317-abd8-c211f91b7330", "a1ffd800-9189-4a69-a24a-9b8c094f12a5" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "fab4fac1-c546-41de-aebc-a14da6895711", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "c7b013f0-5201-4317-abd8-c211f91b7330", "e2cfe4e6-5437-4efb-9a66-8d1371796bda" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d" });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e" });

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c5e174e-3b0e-446f-86af-483d56fd7210");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7b013f0-5201-4317-abd8-c211f91b7330");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fab4fac1-c546-41de-aebc-a14da6895711");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a1ffd800-9189-4a69-a24a-9b8c094f12a5");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e2cfe4e6-5437-4efb-9a66-8d1371796bda");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "63f571eb-4eeb-4a68-b7b4-fdceb49b270a", "AQAAAAIAAYagAAAAEP/MzQo2CukBdsd0Mn4QmP/DZVGJ3YNBaW4THEl7wYmGAST0VhKFOJuGHtE4X9NPQA==", "51ddeb42-63bf-4fa5-9a11-67ade294507d" });
        }
    }
}
