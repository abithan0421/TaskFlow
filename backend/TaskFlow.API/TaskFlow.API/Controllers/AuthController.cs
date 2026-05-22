using Microsoft.AspNetCore.Mvc;

using TaskFlow.BLL.DTOs;
using TaskFlow.BLL.Interfaces;

namespace TaskFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationRequestDto request)
        {
            var result =
                await _authService.RegistrationAsync(request);

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var result =
                await _authService.LoginAsync(request);

            return Ok(result);
        }
    }
}