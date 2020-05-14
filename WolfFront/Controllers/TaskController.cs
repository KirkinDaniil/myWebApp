using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WolfApi.Models;
using WolfApi.Models.ViewModels;

namespace WolfApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        ApplicationDbContext usersDatabase;
        public TaskController(ApplicationDbContext users)
        {
            usersDatabase = users;
        }

        [Authorize]
        [HttpGet]
        public IActionResult UpdateTestStatistics(int Id)
        {
            Models.Task task = usersDatabase.Tests.FirstOrDefault(x => x.Id == Id);
            if(task!=null)
            {
                string answers = task.Answers;
                var matches = answers.Split('|');
                return Ok(matches);
            }
            return BadRequest("No such task");
        }
    }
}