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
    public class UserController : ControllerBase
    {
        ApplicationDbContext usersDatabase;
        public UserController(ApplicationDbContext users)
        {
            usersDatabase = users;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetUserData()
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            if (person!=null)
            {
                var result = new { person.Name, person.Surname, person.Email, person.Login, person.IsActive, person.BirthDate, person.About, person.Gender };
                return Ok(result);
            }
            return BadRequest("Not logined");   
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ChangeUserData([FromBody]InfoModel model)
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            if (person!=null)
            {
                person.Name = model.Name;
                person.Surname = model.Surname;
                person.Login = model.Login;
                await usersDatabase.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Not logined");
        }
    }
}