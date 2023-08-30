using temperature_logging_server.Models;
using temperature_logging_server.Services;
using Microsoft.AspNetCore.Mvc;

namespace temperature_logging_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class LogEntryController : ControllerBase
    {
        private readonly ILogEntryService _logEntryService;

        public LogEntryController(ILogEntryService logEntryService)
        {
            _logEntryService = logEntryService;
        }

        [HttpGet]
        public ActionResult<List<LogEntry>> GetAll() => _logEntryService.GetAll();

        [HttpGet("id")]
        public ActionResult<LogEntry> Get(string id)
        {
            var logEntry = _logEntryService.Get(id);
            if (logEntry == null) { return NotFound(); }
            return logEntry;
        }

        [HttpPost]
        public IActionResult Create(LogEntry logEntry)
        {
            _logEntryService.Add(logEntry);
            return CreatedAtAction(nameof(Get), new { id = logEntry.Id }, logEntry);
        }

        [HttpPut("id")]
        public IActionResult Update(string id, LogEntry logEntry)
        {
            if (id != logEntry.Id)
            {
                return BadRequest();
            }

            var existingLogEntry = _logEntryService.Get(id);
            if (existingLogEntry == null)
            {
                return NotFound();
            }

            _logEntryService.Update(logEntry);
            return NoContent();
        }

        [HttpDelete("id")]
        public IActionResult Delete(string id)
        {
            var logEntry = _logEntryService.Get(id);

            if (logEntry == null)
            {
                return NotFound();
            }

            _logEntryService.Delete(id);
            return NoContent();
        }
    }

}