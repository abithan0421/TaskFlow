using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskFlow.BLL.DTOs
{
    public class CreateSubTaskDto
    {
        [Required]
        public string Title { get; set; }
        public string Remark { get; set; }
    }
}
