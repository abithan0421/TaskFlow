using Microsoft.AspNetCore.Mvc;
using TaskFlow.BLL.Interfaces;
using TaskFlow.BLL.DTOs;
using Microsoft.AspNetCore.Identity.Data;

namespace TaskFlow.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration(RegistrationRequestDto request)
        {
            var res = await _authService.RegistrationAsync(request);
            return Ok(res);

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var res = await _authService.LoginAsync(request);
            return Ok(res);
        }
    }
}
