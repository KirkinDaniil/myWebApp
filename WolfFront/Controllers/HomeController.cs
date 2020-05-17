using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WolfApi.Models;

namespace WolfFront.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext usersDatabase;
        public HomeController(ApplicationDbContext users, IWebHostEnvironment webHost )
        {
            usersDatabase = users;
            _appEnvironment = webHost;
        }

        IWebHostEnvironment _appEnvironment;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult PersonalArea()
        {
            return View();
        }

        public IActionResult Test()
        {
            return View();
        }

        public IActionResult Test2()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Upload([FromForm]IFormFile uploadedFile)
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            string fileName;
            if (uploadedFile != null)
            {
                fileName = System.IO.Path.GetFileName(uploadedFile.FileName);
                string filePath = _appEnvironment.WebRootPath + fileName;
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadedFile.CopyTo(stream);
                }
                person.ImagePath = fileName;
                await usersDatabase.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}
