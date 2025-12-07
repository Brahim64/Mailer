using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.mappers;
using api.models;
using api.services;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;
        public UserController(AuthService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var token = Request.Cookies["AUTH_TOKEN"];
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "No auth token provided" });
            }
            GoogleUserInfo userInfo = await _authService.VerifyGoogleTokenAsync(token);
            User user = userInfo.MapFromGooglePayload();
            return Ok(user);
        }
        [HttpGet("by-email")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(user);
        }


    }
}