using BCrypt.Net;
using TaskFlow.BLL.DTOs;
using TaskFlow.BLL.Helpers;
using TaskFlow.BLL.Interfaces;
using TaskFlow.DAL.Interfaces;
using TaskFlow.DAL.Models;

namespace TaskFlow.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string> RegistrationAsync(RegistrationRequestDto request)
        {
            var existingUser =
                await _userRepository.GetUserByEmailAsync(request.Email);

            if (existingUser != null)
            {
                return "User already exists";
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            await _userRepository.AddUserAsync(user);

            await _userRepository.SaveChangesAsync();

            return "User registered successfully";
        }

        public async Task<string> LoginAsync(LoginRequestDto request)
        {
            var user =
                await _userRepository.GetUserByEmailAsync(request.Email);

            if (user == null)
            {
                return "Invalid email or password";
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.Password
                );

            if (!isPasswordValid)
            {
                return "Invalid email or password";
            }

            return JwtHelper.GenerateToken(user);
        }
    }
}