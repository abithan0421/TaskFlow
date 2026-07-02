using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.DAL.Models;

namespace TaskFlow.DAL.Interfaces
{
    public interface ISubTaskRepository
    {
        Task AddSubTaskAsync(SubTaskItem subTask);
        Task<List<SubTaskItem>> GetTaskByIdSubTaskItemAsync(int mainTaskId);
        Task<SubTaskItem?> GetSubTaskByIdAsync(int subTaskId);
        Task UpdateSubTaskAsync(SubTaskItem subTask);
        Task DeleteSubTaskAsync(SubTaskItem subTask);
        Task SaveChangesAsync();
    }
}
