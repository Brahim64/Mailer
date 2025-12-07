using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public record FirstMessageRequest
    {
        public string SenderId { get; init; }
        public string RecipientId { get; init; }
        public string Content { get; init; }
        
        
    }
}