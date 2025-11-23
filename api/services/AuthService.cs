using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

namespace api.services
{
    public class AuthService
    {
        private readonly HttpClient _httpClient;
        private readonly UserService _userService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(HttpClient httpClient, ILogger<AuthService> logger, UserService userService)
        {
            _httpClient = httpClient;
            _userService = userService;
            _logger = logger;
        }

        public async Task<GoogleUserInfo> VerifyGoogleTokenAsync(string credential)
        {
            try
            {
                var tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=";
                var response = await _httpClient.GetAsync(tokenInfoUrl + credential);
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Google token verification failed with status code: {StatusCode}", response.StatusCode);
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                var userInfo = JsonConvert.DeserializeObject<GoogleUserInfo>(content);
                
                return userInfo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying Google token");
                throw;
            }
        }

        public async Task<string> AuthenticateUserAsync(string credential)
        {
            var userInfo = await VerifyGoogleTokenAsync(credential);
            if (userInfo == null)
            {
                throw new UnauthorizedAccessException("Invalid Google token.");
            }

            bool userExists = await _userService.UserExistsAsync(userInfo.Email);
            if (!userExists)
            {
                await _userService.CreateUserAsync(userInfo);
                _logger.LogInformation("New user created: {Email}", userInfo.Email);
                
            }
            else
            {
                _logger.LogInformation("User {Email} already exists.", userInfo.Email);
            }
            return credential;

        }
    }
}