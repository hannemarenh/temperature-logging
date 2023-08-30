namespace temperature_logging_server.Models
{
    public class LogEntriesDatabaseSettings : ILogEntriesDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string CollectionName { get; set; } = string.Empty;
    }
}
