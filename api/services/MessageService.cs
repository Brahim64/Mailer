using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.repositories;

namespace api.services
{
    public class MessageService
    {
        private readonly MessageRepository _messageRepository;
        private readonly ChatRoomRepository _chatRoomRepository;
        public MessageService(MessageRepository messageRepository, ChatRoomRepository chatRoomRepository)
        {
            _messageRepository = messageRepository;
            _chatRoomRepository = chatRoomRepository;
        }
        public async Task<Message> SendMessageAsync(string roomId, string senderId, string content)
        {
            Message message = new Message
            {
                RoomId = roomId,
                SenderId = senderId,
                Content = content,
                SentAt = DateTime.UtcNow
            };
            
            var new_msg =await _messageRepository.SendMessageAsync(message);
            return await _chatRoomRepository.UpdateLastMessageAsync(roomId, new_msg);

        }
        public async Task DeleteMessageAsync(string messageId)
        {
            await _messageRepository.DeleteMessageAsync(messageId);
        }

    }
}