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
        public UserController(AuthService authService)
        {
            _authService = authService;
        }

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
    }
}