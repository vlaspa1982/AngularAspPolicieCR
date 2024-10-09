using System.ComponentModel.DataAnnotations;

namespace Policie_BE_2.Models
{
    public class GpsData
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime DateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Accuracy { get; set; }
        public double? Altitude { get; set; }
        public double? GeoidHeight { get; set; }
        public double? Speed { get; set; }
        public double? Bearing { get; set; }
        public int SatUsed { get; set; }
        public int SatInView { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
