using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using MongoDB.Driver;

namespace api.repositories
{
    public class ChatRoomRepository
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<ChatRoom> _collection;

        public ChatRoomRepository(IMongoDatabase database)
        {
            _database = database;
            _collection = _database.GetCollection<ChatRoom>("ChatRooms");
        }

        public async Task<ChatRoom> CreateChatRoomAsync(ChatRoom chatRoom)
        {
            await _collection.InsertOneAsync(chatRoom);
            return chatRoom;
        }

        public async Task LeaveChatRoomAsync(string roomId, string userId)
        {
            var update = Builders<ChatRoom>.Update.Pull(cr => cr.ParticipantIds, userId);
            await _collection.UpdateOneAsync(cr => cr.Id == roomId, update);
        }

        public async Task<List<ChatRoom>> GetUserChatRoomsAsync(string userId)
        {
            var filter = Builders<ChatRoom>.Filter.AnyEq(cr => cr.ParticipantIds, userId);
            var chatRooms = await _collection.Find(filter).ToListAsync();
            return chatRooms;
        }
        public async Task<Message> UpdateLastMessageAsync(string roomId, Message lastMessage)
        {
            var update = Builders<ChatRoom>.Update.Set(cr => cr.MetaData.LastMessage, lastMessage);
            await _collection.UpdateOneAsync(cr => cr.Id == roomId, update);
            return lastMessage;
        }
    }
}