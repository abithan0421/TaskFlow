using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskFlow.BLL.DTOs
{
    public class SubTaskResponseDto
    {
        public int Id { get; set; }
        public string SubTask { get; set; }
        public string Remark { get; set; }
        public bool IsCompleted { get; set; }
    }
}
