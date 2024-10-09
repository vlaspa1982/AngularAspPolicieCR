using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Policie_BE_2.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BtsData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<long>(type: "bigint", nullable: false),
                    Position_Latitude = table.Column<double>(type: "float", nullable: false),
                    Position_Longitude = table.Column<double>(type: "float", nullable: false),
                    Position_Accuracy = table.Column<double>(type: "float", nullable: false),
                    Position_Altitude = table.Column<double>(type: "float", nullable: false),
                    Position_Heading = table.Column<double>(type: "float", nullable: false),
                    Position_Speed = table.Column<double>(type: "float", nullable: false),
                    Position_Source = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BtsData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GpsData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Accuracy = table.Column<double>(type: "float", nullable: false),
                    Altitude = table.Column<double>(type: "float", nullable: true),
                    GeoidHeight = table.Column<double>(type: "float", nullable: true),
                    Speed = table.Column<double>(type: "float", nullable: true),
                    Bearing = table.Column<double>(type: "float", nullable: true),
                    SatUsed = table.Column<int>(type: "int", nullable: false),
                    SatInView = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GpsData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CellTower",
                columns: table => new
                {
                    BtsDataId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RadioType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobileCountryCode = table.Column<int>(type: "int", nullable: false),
                    MobileNetworkCode = table.Column<int>(type: "int", nullable: false),
                    LocationAreaCode = table.Column<int>(type: "int", nullable: false),
                    CellId = table.Column<int>(type: "int", nullable: false),
                    PrimaryScramblingCode = table.Column<int>(type: "int", nullable: false),
                    Serving = table.Column<int>(type: "int", nullable: false),
                    SignalStrength = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CellTower", x => new { x.BtsDataId, x.Id });
                    table.ForeignKey(
                        name: "FK_CellTower_BtsData_BtsDataId",
                        column: x => x.BtsDataId,
                        principalTable: "BtsData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CellTower");

            migrationBuilder.DropTable(
                name: "GpsData");

            migrationBuilder.DropTable(
                name: "BtsData");
        }
    }
}
