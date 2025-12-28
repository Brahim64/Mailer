using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.models.requests;
using api.services;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly MessageService _messageService;
        private readonly ChatRoomService _chatRoomService;
        public ChatController(MessageService messageService, ChatRoomService chatRoomService)
        {
            _messageService = messageService;
            _chatRoomService = chatRoomService;
        }
        [HttpPost("first-message")]
        public async Task<IActionResult> FirstMessage([FromBody] FirstMessageRequest request)
        {
            var chatRoom=await _chatRoomService.CreateChatRoomAsync( [request.SenderId, request.RecipientId]);
            await _messageService.SendMessageAsync(chatRoom.Id, request.SenderId, request.Content);
            return Ok(new { message = "Message sent successfully" });
        }
        [HttpGet("{userId}/chatrooms")]
        public async Task<IActionResult> GetUserChatRooms([FromRoute] string userId)
        {
            var chatRooms=await _chatRoomService.GetUserChatRoomsAsync(userId);
            return Ok(chatRooms);
        }
        [HttpGet("chatroom/{roomId}")]
        public async Task<IActionResult> GetChatRoomById([FromRoute] string roomId)
        {
            var chatRoom=await _chatRoomService.GetChatRoomByIdAsync(roomId);
            return Ok(chatRoom);
        }

        [HttpGet("{roomId}/messages")]
        public async Task<IActionResult> GetMessages([FromRoute] string roomId)
        {
            var messages = await _messageService.GetMessagesByChatRoomIdAsync(roomId);
            return Ok(messages);
        }

        [HttpPost("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageRequest request)
        {
            await _messageService.SendMessageAsync(request.RoomId, request.SenderId, request.Content);
            return Ok(new { message = "Message sent successfully" });
        }
    }
}

