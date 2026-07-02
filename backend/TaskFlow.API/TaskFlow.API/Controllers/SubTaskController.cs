using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.BLL.Interfaces;
using TaskFlow.BLL.DTOs;

namespace TaskFlow.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SubTaskController:ControllerBase
    {
        private readonly ISubTaskService _subTaskService;
        public SubTaskController(ISubTaskService subTaskService)
        {
            _subTaskService = subTaskService;
        }

        [HttpGet("{mainTaskId}")]
        public async Task<IActionResult> GetTaskSubTasks(int mainTaskId)
        {
            var subTasks = await _subTaskService.GetSubTasksAsync(mainTaskId);
            return Ok(subTasks);
        }

        [HttpPost("{mainTaskId}")]
        public async Task<IActionResult> CreateSubTask(int mainTaskId, CreateSubTaskDto request)
        {
            await _subTaskService.CreateSubTaskAsync(request, mainTaskId);
            return Ok("Sub-task created successfully");
        }

        [HttpPut("{mainTaskId}/{subtaskId}/complete")]
        public async Task<IActionResult> MarkComplete(int subtaskId, int mainTaskId)
        {
            await _subTaskService.MarkCompleteAsync(subtaskId, mainTaskId);
            return Ok("Sub-task marked as complete");
        }

        [HttpDelete("{mainTaskId}/{subtaskId}/remove")]
        public async Task<IActionResult> RemoveSubTask(int subtaskId, int mainTaskId)
        {
            await _subTaskService.RemoveSubTaskAsync(subtaskId, mainTaskId);
            return Ok("Sub-task removed successfully");
        }

        [HttpPut("{mainTaskId}/{subtaskId}/update")]
        public async Task<IActionResult> UpdateSubTask(int subtaskId, int mainTaskId, CreateSubTaskDto request)
        {
            await _subTaskService.UpdateSubTaskAsync(subtaskId, request, mainTaskId);
            return Ok("Sub-task updated successfully");
        }

    }
}
