using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.models;
using api.models.dtos;
using api.repositories;
using Microsoft.EntityFrameworkCore;

namespace api.services
{
    public class ChatRoomService
    {
        private readonly ChatRoomRepository _chatRoomRepository;
        private readonly AppDBContext _UserContext;
        public ChatRoomService(ChatRoomRepository chatRoomRepository, AppDBContext context)
        {
            _chatRoomRepository = chatRoomRepository;
            _UserContext = context;
        }
        public async Task<ChatRoom> CreateChatRoomAsync( List<string> memberIds)
        {
            List<User> users=await _UserContext.Users.Where(u=>memberIds.Contains(u.Id)).ToListAsync();
            Dictionary<string,UserDto> userDTOs=[];

            foreach(var user in users)
            {
                userDTOs[user.Id]=new UserDto
                {
                    Issuer=user.Issuer,
                    ProfileImage=user.ProfileImage,
                    Email=user.Email,
                    Name=user.Name,
                    EmailVerified=user.EmailVerified

                };
            }
            ChatRoomMetaData ChatRoomMetaData=new ChatRoomMetaData
            {
                CreatedAt=DateTime.UtcNow,
                users=userDTOs
            };
            var createdRoom=await _chatRoomRepository.CreateChatRoomAsync(new ChatRoom
            {
                Name = "",
                ParticipantIds = memberIds,
                Private = true,
                MetaData=ChatRoomMetaData
                
            });
            return createdRoom;
        }
        public async Task LeaveChatRoomAsync(string roomId, string userId)
        {
            await _chatRoomRepository.LeaveChatRoomAsync(roomId, userId);
        }

        public async Task<List<ChatRoom>> GetUserChatRoomsAsync(string userId)
        {
            return await _chatRoomRepository.GetUserChatRoomsAsync(userId);    
            
        }
    }
}