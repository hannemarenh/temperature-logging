using temperature_logging_server.Models;
using temperature_logging_server.Services;
using Microsoft.AspNetCore.Mvc;

namespace temperature_logging_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class LogEntryController : ControllerBase
    {
        public LogEntryController() { }

        [HttpGet]
        public ActionResult<List<LogEntry>> GetAll() => LogEntryService.GetAll();

        [HttpGet("id")]
        public ActionResult<LogEntry> Get(int id)
        {
            var logEntry = LogEntryService.Get(id);
            if (logEntry == null) { return NotFound(); }
            return logEntry;
        }

        [HttpPost]
        public IActionResult Create(LogEntry logEntry)
        {
            LogEntryService.Add(logEntry);
            return CreatedAtAction(nameof(Get), new { id = logEntry.Id }, logEntry);
        }

        [HttpPut("id")]
        public IActionResult Update(int id, LogEntry logEntry)
        {
            if(id != logEntry.Id)
            {
                return BadRequest();
            }

            var existingLogEntry = LogEntryService.Get(id);
            if(existingLogEntry == null)
            {
                return NotFound();
            }

            LogEntryService.Update(logEntry);
            return NoContent();
        }

        [HttpDelete("id")]
        public IActionResult Delete(int id)
        {
            var logEntry =LogEntryService.Get(id);

            if (logEntry == null)
            {
                return NotFound();
            }

            LogEntryService.Delete(id);
            return NoContent();
        }
    }

}