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
    public class SubTaskService : ISubTaskService
    {
        private readonly ISubTaskRepository _subTaskRepository;

        public SubTaskService(ISubTaskRepository subTaskRepository)
        {
            _subTaskRepository = subTaskRepository;
        }
        public async Task CreateSubTaskAsync(CreateSubTaskDto createSubTaskDto, int mainTaskId)
        {
            try
            {
                if(createSubTaskDto == null)
                {
                    Console.WriteLine("Subtask is empty");
                    return;
                }
                var subtask = new SubTaskItem
                {
                    Title = createSubTaskDto.Title,
                    Remark = createSubTaskDto.Remark,
                    MainTaskId = mainTaskId
                };
                await _subTaskRepository.AddSubTaskAsync(subtask);
                await _subTaskRepository.SaveChangesAsync();
            }
            catch(Exception e)
            {
                Console.WriteLine("Unable to create: "+ e);
            }
        }

        public async Task<List<SubTaskResponseDto>> GetSubTasksAsync(int mainTaskId)
        {
            try
            {
                var subTasks = await _subTaskRepository.GetTaskByIdSubTaskItemAsync(mainTaskId);
                return subTasks.Select(subTask => new SubTaskResponseDto
                {
                    Id = subTask.Id,
                    SubTask = subTask.Title,
                    Remark = subTask.Remark,
                    IsCompleted = subTask.IsCompleted
                }).ToList();
            }
            catch(Exception e)
            {
                Console.WriteLine("Unable to get subtasks: " + e);
            }
            return null;
        }

        public async Task MarkCompleteAsync(int subtaskId, int mainTaskId)
        {
            var subTask = await _subTaskRepository.GetSubTaskByIdAsync(subtaskId);
            try
            {
                if (subTask == null)
                {
                    Console.WriteLine("SubTask not found");
                    return;
                }
                if (subTask.MainTaskId != mainTaskId)
                {
                    Console.WriteLine("MainTaskId mismatch");
                    return;
                }

                subTask.IsCompleted = true;

                await _subTaskRepository.SaveChangesAsync();

            }
            catch (Exception e)
            {
                Console.WriteLine("Unable to mark as complete: " + e);
            }
        }

        public async Task RemoveSubTaskAsync(int subtaskId, int mainTaskId)
        {
            var subTask = await _subTaskRepository.GetSubTaskByIdAsync(subtaskId);
            try
            {
                if (subTask == null)
                {
                    Console.WriteLine("Subtask not found");
                    return;
                }
                await _subTaskRepository.DeleteSubTaskAsync(subTask);
                await _subTaskRepository.SaveChangesAsync();
            }
            catch(Exception e)
            {
                Console.WriteLine("Unable to delete: " + e);
            }
        }

        public async Task UpdateSubTaskAsync(int subtaskId, CreateSubTaskDto updateSubTaskDto, int mainTaskId)
        {
            var subTask = await _subTaskRepository.GetSubTaskByIdAsync(subtaskId);
            try
            {
                if (subTask == null)
                {
                    Console.WriteLine("Subtask not found");
                    return;
                }
                subTask.Title = updateSubTaskDto.Title;
                subTask.Remark = updateSubTaskDto.Remark;
                await _subTaskRepository.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine("Unable to update: " + e);
            }
        }
    }
}
