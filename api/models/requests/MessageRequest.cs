using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.requests
{
    public record MessageRequest
    {
        public string SenderId { get; init; }
        public string Content { get; init; }
        public string RoomId { get; init; }
    }
}