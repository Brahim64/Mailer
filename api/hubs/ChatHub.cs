using api.models;
using api.models.requests;
using api.services;
using Microsoft.AspNetCore.SignalR;

namespace api.hubs
{
    public class ChatHub : Hub
    {

        private readonly MessageService _messageService;

        public ChatHub(MessageService messageService)
        {
            _messageService = messageService;
        }
        public async Task JoinRoom(string chatRoomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatRoomId);
        }
        public async Task LeaveRoom(string chatRoomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatRoomId);
        }

        public async Task SendMessage(MessageRequest message)
        {
            await _messageService.SendMessageAsync(message.RoomId, message.SenderId, message.Content);
            await Clients
                .Group(message.RoomId)
                .SendAsync("newMessage", message);
        }
    }
}