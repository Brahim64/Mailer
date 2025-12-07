using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.models
{
    public class Message
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("roomId")]
        public string RoomId { get; set; }

        [BsonElement("senderId")]
        [BsonRepresentation(BsonType.String)]
        public string SenderId { get; set; }

        [BsonElement("content")]
        public string Content { get; set; }

        [BsonElement("sentAt")]
        public DateTime SentAt { get; set; }
    }
}