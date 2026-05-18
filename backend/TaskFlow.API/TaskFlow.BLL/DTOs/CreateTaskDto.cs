using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TaskFlow.BLL.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
