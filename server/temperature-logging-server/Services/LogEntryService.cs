using Microsoft.Extensions.Options;
using MongoDB.Driver;
using temperature_logging_server.Models;

namespace temperature_logging_server.Services
{
    public class LogEntryService : ILogEntryService
    {
        private readonly IMongoCollection<LogEntry> _logEntries;

        public LogEntryService(IOptions<LogEntriesDatabaseSettings> logEntriesDatabaseSettings, IMongoClient mongoClient)
        {
            var mongoDatabase = mongoClient.GetDatabase(logEntriesDatabaseSettings.Value.DatabaseName);
            _logEntries = mongoDatabase.GetCollection<LogEntry>(logEntriesDatabaseSettings.Value.CollectionName);

        }

        public List<LogEntry> GetAll() => _logEntries.Find(logEntry => true).ToList();

        public LogEntry? Get(string id)
        {
            return  _logEntries.Find(l => l.Id == id).FirstOrDefault();
        }

        public void Add(LogEntry logEntry)
        {
            _logEntries.InsertOne(logEntry);
        }

        public void Update(LogEntry logEntry)
        {
            _logEntries.ReplaceOne(l => l.Id == logEntry.Id, logEntry);
        }

        public  void Delete(string id)
        {
            _logEntries.DeleteOne(l => l.Id == id);
        }

    }
}
