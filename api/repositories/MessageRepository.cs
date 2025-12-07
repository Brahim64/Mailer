using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace api.repositories
{
    public class MessageRepository
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<Message> _collection;

        public MessageRepository(IMongoDatabase database)
        {
            _database = database;
            _collection = _database.GetCollection<Message>("Messages");
        }

        public async Task<Message> SendMessageAsync(Message message)
        {
            
            message.SentAt = DateTime.UtcNow;

            try
            {
                await _collection.InsertOneAsync(message);
                return message;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteMessageAsync(string messageId)
        {
            var id = ObjectId.Parse(messageId);
            await _collection.DeleteOneAsync(m => m.Id == id);
        }

        public async Task<List<Message>> GetMessagesByChatRoomIdAsync(string chatRoomId)
        {
            var filter = Builders<Message>.Filter.Eq(m => m.RoomId, chatRoomId);
            var messages = await _collection.Find(filter).ToListAsync();
            return messages;
        }

        public async Task<Message> GetLastMessageInChatRoomAsync(string chatRoomId)
        {
            var filter = Builders<Message>.Filter.Eq(m => m.RoomId, chatRoomId);
            var sort = Builders<Message>.Sort.Descending(m => m.SentAt);
            var message = await _collection.Find(filter).Sort(sort).FirstOrDefaultAsync();
            return message;
        }
    }
}