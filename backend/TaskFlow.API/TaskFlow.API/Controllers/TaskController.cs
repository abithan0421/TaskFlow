using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.BLL.Interfaces;
using TaskFlow.BLL.DTOs;
using System.Security.Claims;

namespace TaskFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskDto request) 
        {
                 var userId = GetUserId();
                await _taskService.CreateTaskAsync(request, userId);
                return Ok("Task created successfully");
        }

        [HttpGet]
        public async Task<IActionResult> GetUserTasks()
        {
            var userId = GetUserId();
            var tasks = await _taskService.GetUserTasksAsync(userId);
            return Ok(tasks);
        }

        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkComplete(int id)
        {
            var userId = GetUserId();

            await _taskService.MarkCompleteAsync(id, userId);

            return Ok("Task marked as complete");
        }

        [HttpDelete("{id}/remove")]
        public async Task<IActionResult> RemoveTask(int id)
        {
            var userId = GetUserId();
            await _taskService.RemoveTaskAsync(id, userId);
            return Ok("Task removed successfully");
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateTask(int id, CreateTaskDto request)
        {
            var userId = GetUserId();
            await _taskService.UpdateTaskAsync(id, request, userId);
            return Ok("Task updated successfully");
        }
        
        private int GetUserId()
            {
                var UserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                return int.Parse(UserIdClaim!.Value);
            }
       }
    }
