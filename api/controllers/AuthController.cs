using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.services;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var credential = await _authService.AuthenticateUserAsync(request.Credential);
            Response.Cookies.Append("AUTH_TOKEN", credential, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });

            return Ok(new { message = "Logged in successfully" });
        }

    }
}