using TaskFlow.DAL.Models;

namespace TaskFlow.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);

        Task AddUserAsync(User user);

        Task SaveChangesAsync();
    }
}