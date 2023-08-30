using temperature_logging_server.Models;

namespace temperature_logging_server.Services
{
    public interface ILogEntryService
    {
        List<LogEntry> GetAll();
        LogEntry? Get(string id);
        void Add(LogEntry logEntry);
        void Update(LogEntry logEntry);
        void Delete(string id);
    }
}

