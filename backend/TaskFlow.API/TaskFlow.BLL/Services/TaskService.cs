using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.BLL.DTOs;
using TaskFlow.BLL.Interfaces;
using TaskFlow.DAL.Interfaces;
using TaskFlow.DAL.Models;

namespace TaskFlow.BLL.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        async Task ITaskService.CreateTaskAsync(CreateTaskDto createTaskDto, int userId)
        {
            var task = new TaskItem
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                UserId = userId
            };
            await _taskRepository.AddTaskAsync(task);
            await _taskRepository.SaveChangesAsync();

        }

        async Task<List<TaskResponseDto>> ITaskService.GetUserTasksAsync(int userId)
        {
            var tasks = await _taskRepository.GetUserByIdTaskItemAsync(userId);
            return tasks.Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Task = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted
            }).ToList();
        }
    }
}
