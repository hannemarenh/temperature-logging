using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace temperature_logging_server.Models
{
    public class LogEntry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("Temperature")]
        public float Temperature { get; set; }

        [BsonElement("Date")]
        public DateTime Date { get; set; }

    }
}
