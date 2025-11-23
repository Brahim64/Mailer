using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.models
{
    public class GoogleUserInfo
    {
        [JsonProperty("iss")]
        public string Iss { get; set; }

        [JsonProperty("sub")]
        public string Sub { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        // sample contains "true" as a string; keep as string to match that format
        [JsonProperty("email_verified")]
        public string EmailVerified { get; set; }

        [JsonProperty("nbf")]
        public string Nbf { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        // keep original property name mapping
        [JsonProperty("picture")]
        public string ProfileImage { get; set; }

        // keep original property name mapping
        [JsonProperty("given_name")]
        public string FirstName { get; set; }

        [JsonProperty("family_name")]
        public string FamilyName { get; set; }

        [JsonProperty("iat")]
        public string Iat { get; set; }

        [JsonProperty("exp")]
        public string Exp { get; set; }

        [JsonProperty("jti")]
        public string Jti { get; set; }

        [JsonProperty("alg")]
        public string Alg { get; set; }

        [JsonProperty("kid")]
        public string Kid { get; set; }

        [JsonProperty("typ")]
        public string Typ { get; set; }
    }
}