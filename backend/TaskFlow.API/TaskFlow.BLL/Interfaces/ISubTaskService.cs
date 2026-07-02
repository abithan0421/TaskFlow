using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.BLL.DTOs;

namespace TaskFlow.BLL.Interfaces
{
    public interface ISubTaskService
    {
        Task CreateSubTaskAsync(CreateSubTaskDto createSubTaskDto, int mainTaskId);
        Task<List<SubTaskResponseDto>> GetSubTasksAsync(int mainTaskId);
        Task MarkCompleteAsync(int subtaskId, int mainTaskId);
        Task RemoveSubTaskAsync(int subtaskId, int mainTaskId);
        Task UpdateSubTaskAsync(int subtaskId, CreateSubTaskDto updateSubTaskDto, int mainTaskId);
    }
}
