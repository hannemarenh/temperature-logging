using temperature_logging_server.Models;

namespace temperature_logging_server.Services
{
    public class LogEntryService
    {
        static List<LogEntry> LogEntries { get; }
        static int nextId = 3;
        static LogEntryService()
        {
            LogEntries = new List<LogEntry>
            {
                new LogEntry {Id=1, Temperature=(float)37.5, Date=new DateTime(2023,08,28)},
                new LogEntry {Id=2, Temperature=(float)37.8, Date=new DateTime(2023,08,29)}
            };
        }

        public static List<LogEntry> GetAll() => LogEntries;

        public static LogEntry? Get(int id) => LogEntries.FirstOrDefault(l => l.Id == id);

        public static void Add(LogEntry logEntry)
        {
            logEntry.Id = nextId++;
            LogEntries.Add(logEntry);
        }

        public static void Update(LogEntry logEntry)
        {
            var index = LogEntries.FindIndex(l => l.Id == logEntry.Id);
            if(index == -1)
            {
                return;
            }
            LogEntries[index] = logEntry;
        }

        public static void Delete(int id)
        {
            var logEntry = Get(id);
            if (logEntry == null)
            {
                return;
            }
            LogEntries.Remove(logEntry);
        }

    }
}
