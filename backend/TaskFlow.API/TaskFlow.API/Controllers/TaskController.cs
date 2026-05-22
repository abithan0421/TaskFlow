using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.BLL.Interfaces;
using TaskFlow.BLL.DTOs;
using Microsoft.Identity.Client;
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

        private int GetUserId()
        {
            var UserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(UserIdClaim!.Value);
        }


    }
    }
