using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models.dtos;

namespace api.models
{
    public class ChatRoomMetaData
    {
        public DateTime CreatedAt { get; set; }
        public List< UserDto> users { get; set; }
        public Message LastMessage { get; set; }
    }
}