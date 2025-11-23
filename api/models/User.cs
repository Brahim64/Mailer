using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class User
    {
        
        public string Id { get; set; }
        public string Issuer { get; set; }

        public string Email { get; set; }

        public string EmailVerified { get; set; }

        public string Name { get; set; }

        public string ProfileImage { get; set; }

        public string FirstName { get; set; }

        public string FamilyName { get; set; }
    }
}