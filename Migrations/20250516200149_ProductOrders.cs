using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TinyTreats.Migrations
{
    /// <inheritdoc />
    public partial class ProductOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2c5e174e-3b0e-446f-86af-483d56fd7210", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c" });

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
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    IsAvailable = table.Column<bool>(type: "boolean", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a1ffd800-9189-4a69-a24a-9b8c094f12a5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cf7ae2cb-6589-4f49-bb1f-2fae3faa2895", "AQAAAAIAAYagAAAAEPc6WBscPZ9H/D0wDX6twZ5NUai/4omR/aY1kYqWdcSfzNI7Yy7HmF0GZD1Y7mNYxQ==", "15218561-7c0d-4d86-9928-4d9d261732ef" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bc1c0c42-2cd7-4582-a1d4-777c8d404304", "AQAAAAIAAYagAAAAECcOFRzELgcx1nypKVSRmjRgbLsu5iNT22TA6pRK5zjMNNI+G6UfDsilK/ddlf/bTg==", "bb03b2fc-7fc8-494c-918e-1935c8fa00ad" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a2a90c82-0efa-4e55-a790-8f1f6e4aaa69", "AQAAAAIAAYagAAAAEG3aKYVz/Tfs4gaHpX0se0IyjC9/vEnZiIGfBjaExPG4AMlvQkggTc/UwuD3FQmvBA==", "326ec825-8ff8-451c-bf6e-63d9f032ceb1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3da8f312-2be0-4430-88a5-e0c7a750bdea", "AQAAAAIAAYagAAAAEEKZwAxFLdHabbyhisLkvDiJphGIBFXVmopRyq+9A+XU/+6n3a45V0DBOH8I1XbZHg==", "c09a8fce-574c-48b1-8194-63184bf108eb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e2cfe4e6-5437-4efb-9a66-8d1371796bda",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eddc05ef-fd87-45cf-84c7-9c9f5cd44f9a", "AQAAAAIAAYagAAAAEIx9VYFhEcb6Ux9qMvxbP46Q+Eijvj0TixDc8Lzbkp1J1iv7FM1sPmdxpjqBRmiCzw==", "9a94080f-c39b-4681-9602-f725039911d7" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsAvailable", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Classic chocolate chip cookie with a soft center and crisp edges", "/images/chocolate-chip-cookie.jpg", true, "Chocolate Chip Cookie", 2.50m },
                    { 2, "Light and fluffy vanilla cupcake with buttercream frosting", "/images/vanilla-cupcake.jpg", true, "Vanilla Cupcake", 3.75m },
                    { 3, "Moist muffin packed with fresh blueberries", "/images/blueberry-muffin.jpg", true, "Blueberry Muffin", 3.25m },
                    { 4, "Soft roll with cinnamon swirl and cream cheese frosting", "/images/cinnamon-roll.jpg", true, "Cinnamon Roll", 4.50m },
                    { 5, "Rich and fudgy chocolate brownie", "/images/chocolate-brownie.jpg", true, "Chocolate Brownie", 3.00m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserProfileId",
                table: "Orders",
                column: "UserProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a1ffd800-9189-4a69-a24a-9b8c094f12a5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5217f52-5f47-42ae-ba5b-ca3ba6e7e456", "AQAAAAIAAYagAAAAEBqK+s1Pzo/8Ti90vSznlSrawGfS3HIs+Rzc5arZooN8Cb51YMgb91peOCOUeTtMLQ==", "651e3a09-01b2-47dd-95b8-f7002aae29ca" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b9c6f5e4-d4d5-4a16-9551-b7e5e859c35a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "854a0fec-276b-4e02-bb71-bbde32068afb", "AQAAAAIAAYagAAAAEE+y4DiwsG2WwRoaerPMTYhuf31fQblIarBninYgWwBdvEEBiQuqq/LJJAInhd9x1Q==", "b6495448-2b1e-492b-a7e1-015d34080039" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c9d6f5e4-d4d5-4a16-9551-b7e5e859c35b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d4208ae8-3d45-4723-ba41-ed46eff5bbf3", "AQAAAAIAAYagAAAAELE8sr5Y0PoqcpMkGFSiTht+5UWGbV3T+GR+umRsvMTudXh9H7KbWBa0vuNBRN53FA==", "ec1f876d-5b4c-447d-9e50-5fb7981a9d1e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4fb776c4-d77e-4c6b-9152-9ba87b26a41b", "AQAAAAIAAYagAAAAEEhI3Sm8u7HDM87IF/iJbCmoUspr2rM0gQXTpqvVwfpQseyxUd4BoisdaI4FiADTZQ==", "e520ed15-1d8b-4a7f-8d12-f21a01ddccac" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e2cfe4e6-5437-4efb-9a66-8d1371796bda",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "80b48ed3-e2dd-4091-8021-bd24ea9d45e2", "AQAAAAIAAYagAAAAEBsPKisJg2q7wa0xDx3o8SeakxM6IYKmhp85EFe6i7hoi/PdX8g1l9BTEUfVdxgYxg==", "c8d9616c-39cf-4937-8372-3e7c1f6db659" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c", 0, "18e0e7ff-ccc5-48ae-9bdb-2db9fffedfde", "customer3@example.com", true, false, null, "CUSTOMER3@EXAMPLE.COM", "CUSTOMER3@EXAMPLE.COM", "AQAAAAIAAYagAAAAEAR86BRI0YXuCyhHhiZF5rcsd8G5FlxZw3Eo80GKaZ8czYXX80WhWtJAYvG+SEuhSw==", null, false, "005b417d-e7fe-453a-a269-5b6acad7915f", false, "customer3@example.com" },
                    { "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d", 0, "f7f4f54e-21e2-478f-a4da-f937bc2b17da", "customer4@example.com", true, false, null, "CUSTOMER4@EXAMPLE.COM", "CUSTOMER4@EXAMPLE.COM", "AQAAAAIAAYagAAAAEGARNvl9fg+x6d97zK2hERdirfqNu5G0+WjRcE49LxrBrAqWrP42peIUGNLlV8rEVA==", null, false, "9f373bfb-dc86-45b5-81e6-4485f3bcf2d6", false, "customer4@example.com" },
                    { "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e", 0, "884f6309-00a9-4a86-b3bf-6d5ced6c0f26", "customer5@example.com", true, false, null, "CUSTOMER5@EXAMPLE.COM", "CUSTOMER5@EXAMPLE.COM", "AQAAAAIAAYagAAAAEPCcE+cpqxiiryRLMSbXKd8Lx7QUASECov+zyGWp3yz09iC1NLeX/gObcEa17tghwg==", null, false, "a44a3552-5c6b-4179-8045-b94ca0520187", false, "customer5@example.com" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d" },
                    { "2c5e174e-3b0e-446f-86af-483d56fd7210", "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "LastName" },
                values: new object[,]
                {
                    { 6, "303 Frosting Ln", "Carol", "d9d6f5e4-d4d5-4a16-9551-b7e5e859c35c", "Williams" },
                    { 7, "404 Cookie Ct", "David", "e9d6f5e4-d4d5-4a16-9551-b7e5e859c35d", "Brown" },
                    { 8, "505 Muffin Ave", "Emma", "f9d6f5e4-d4d5-4a16-9551-b7e5e859c35e", "Davis" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }
    }
}
