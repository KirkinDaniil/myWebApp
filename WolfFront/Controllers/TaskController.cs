using System.Linq;
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
        [Authorize]
        [HttpPost]
        public IActionResult UpdateTestStatistics([FromBody]int points)
        {
            return Ok();
        }
    }
}