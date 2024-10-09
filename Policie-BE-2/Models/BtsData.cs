using System.ComponentModel.DataAnnotations;

namespace Policie_BE_2.Models
{
    public class BtsData
    {
        [Key]
        public int Id { get; set; }
        public long Timestamp { get; set; }
        public Position Position { get; set; }
        public List<CellTower> CellTowers { get; set; }
    }
    public class Position
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Accuracy { get; set; }
        public double Altitude { get; set; }
        public double Heading { get; set; }
        public double Speed { get; set; }
        public string Source { get; set; }
    }
    public class CellTower
    {
        public string RadioType { get; set; }
        public int MobileCountryCode { get; set; }
        public int MobileNetworkCode { get; set; }
        public int LocationAreaCode { get; set; }
        public int CellId { get; set; }
        public int PrimaryScramblingCode { get; set; }
        public int Serving { get; set; }
        public int SignalStrength { get; set; }
    }
}
