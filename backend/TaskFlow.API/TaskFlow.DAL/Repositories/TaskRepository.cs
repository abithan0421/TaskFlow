using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.DAL.Interfaces;
using TaskFlow.DAL.Models;
using TaskFlow.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace TaskFlow.DAL.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _dbcontext;
        public TaskRepository(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

         async Task ITaskRepository.AddTaskAsync(TaskItem task)
        {
            await _dbcontext.TaskItems.AddAsync(task);
        }

        async Task<List<TaskItem>> ITaskRepository.GetUserByIdTaskItemAsync(int id)
        {
            return await _dbcontext.TaskItems.Where(x => x.UserId == id).ToListAsync();
        }

        async Task<TaskItem> ITaskRepository.GetTaskByIdAsync(int id)
        {
            return await _dbcontext.TaskItems.FirstOrDefaultAsync(x=>x.Id == id);
        }

        async Task ITaskRepository.DeleteTaskAsync(TaskItem task)
        {
            _dbcontext.TaskItems.Remove(task);
        }
        async Task ITaskRepository.SaveChangesAsync()
        {
            await _dbcontext.SaveChangesAsync();
        }
    }
}
