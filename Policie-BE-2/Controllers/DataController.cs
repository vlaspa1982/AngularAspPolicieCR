using Microsoft.AspNetCore.Mvc;
using Policie_BE_2.Data;
using Policie_BE_2.Models;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DataController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> SaveData([FromBody] DataPayload payload)
    {
        if (payload == null)
        {
            return BadRequest("No data received.");
        }

        // Save BTS data
        foreach (var bts in payload.BtsData)
        {
            _context.BtsData.Add(bts);
        }

        // Save GPS data
        foreach (var gps in payload.GpsData)
        {
            _context.GpsData.Add(gps);
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Data saved successfully." });
    }
}

public class DataPayload
{
    public List<BtsData> BtsData { get; set; }
    public List<GpsData> GpsData { get; set; }
}