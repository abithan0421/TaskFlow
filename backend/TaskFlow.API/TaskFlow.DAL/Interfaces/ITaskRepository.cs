using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.DAL.Models;

namespace TaskFlow.DAL.Interfaces
{
    public interface ITaskRepository
    {
        Task AddTaskAsync(TaskItem task);
        Task<List<TaskItem>> GetUserByIdTaskItemAsync(int id);
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task DeleteTaskAsync(TaskItem task);
        Task SaveChangesAsync();

    }
}
