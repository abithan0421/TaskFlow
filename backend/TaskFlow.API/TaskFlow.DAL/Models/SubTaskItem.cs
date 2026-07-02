using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskFlow.DAL.Models
{
    public class SubTaskItem
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Remark { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public int MainTaskId { get; set; }
        public TaskItem MainTask { get; set; }
    }
}
