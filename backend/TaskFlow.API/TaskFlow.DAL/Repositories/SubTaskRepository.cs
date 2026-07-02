using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.DAL.Data;
using TaskFlow.DAL.Interfaces;
using TaskFlow.DAL.Models;

namespace TaskFlow.DAL.Repositories
{
    public class SubTaskRepository : ISubTaskRepository
    {
        private readonly ApplicationDbContext _context;
        public SubTaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddSubTaskAsync(SubTaskItem subtask)
        {
            await _context.SubTaskItems.AddAsync(subtask);
        }

        public async Task DeleteSubTaskAsync(SubTaskItem subtask)
        {
             _context.SubTaskItems.Remove(subtask);
        }

        public async Task<SubTaskItem> GetSubTaskByIdAsync(int subTaskId)
        {
            return await _context.SubTaskItems.FirstOrDefaultAsync(x => x.Id == subTaskId);
        }
        public async Task<List<SubTaskItem>> GetTaskByIdSubTaskItemAsync(int mainTaskid)
        {
            return await _context.SubTaskItems.Where(x => x.MainTaskId == mainTaskid).ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSubTaskAsync(SubTaskItem task)
        {
            _context.SubTaskItems.Update(task);
        }
    }
}
