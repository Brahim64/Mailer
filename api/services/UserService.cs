using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.mappers;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.services
{
    public class UserService
    {
        private readonly AppDBContext _context;

        public UserService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
        public async Task CreateUserAsync(GoogleUserInfo googleUser)
        {
            User user = googleUser.MapFromGooglePayload();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}