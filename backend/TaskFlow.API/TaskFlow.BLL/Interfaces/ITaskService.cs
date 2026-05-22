using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskFlow.BLL.DTOs;
namespace TaskFlow.BLL.Interfaces
{
    public interface ITaskService
    {
        Task CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
        Task <List<TaskResponseDto>> GetUserTasksAsync(int userId);
    }
}
