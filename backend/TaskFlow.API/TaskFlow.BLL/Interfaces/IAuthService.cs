using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.BLL.DTOs;

namespace TaskFlow.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegistrationAsync(RegistrationRequestDto request);
        Task<string> LoginAsync(LoginRequestDto request);
    }
}
