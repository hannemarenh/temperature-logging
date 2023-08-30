namespace temperature_logging_server.Models
{
    public class LogEntry
    {
        public int Id { get; set; }
        public float Temperature { get; set; }
        public DateTime Date { get; set; }

    }
}
