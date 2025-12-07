using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models.dtos
{
    public class ChatRoomDTO
    {
        public string Name { get; set; }
        public bool Private { get; set; }
        public List<string> ParticipantIds { get; set; }
        
    }
}