using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WolfApi.Models;

namespace WolfFront.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : Controller
    {
        ApplicationDbContext usersDatabase;
        public PasswordController(ApplicationDbContext users)
        {
            usersDatabase = users;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ChangeUserPass([FromBody] string NewPass)
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            if (person != null)
            {
                person.Password = NewPass+"ccc";
                await usersDatabase.SaveChangesAsync();
            }
            return Ok();
        }
    }
}
