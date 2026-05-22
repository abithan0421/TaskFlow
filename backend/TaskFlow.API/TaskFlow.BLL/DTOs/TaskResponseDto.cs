using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskFlow.BLL.DTOs
{
    public class TaskResponseDto
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
