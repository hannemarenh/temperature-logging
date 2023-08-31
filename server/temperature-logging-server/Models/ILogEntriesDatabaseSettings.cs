namespace temperature_logging_server.Models
{
    public interface ILogEntriesDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string CollectionName { get; set; }
    }
}
