using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using api.models.dtos;

namespace api.mappers
{
    public static class UserMapper
    {
        public static User MapFromGooglePayload(this GoogleUserInfo payload)
        {
            return new User
            {
                Id = payload.Sub,
                Issuer = payload.Iss,
                Email = payload.Email,
                EmailVerified = payload.EmailVerified,
                Name = payload.Name,
                ProfileImage = payload.ProfileImage,
                FirstName = payload.FirstName,
                FamilyName = payload.FamilyName
            };
        }
        public static UserDto MapToUserDto(this User user)
        {
            return new UserDto
            {
                Issuer = user.Issuer,
                Email = user.Email,
                EmailVerified = user.EmailVerified,
                Name = user.Name,
                ProfileImage = user.ProfileImage
            };
        }
    }
}