using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using WolfApi.Models;

namespace WolfFront.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext usersDatabase;
        public HomeController(ApplicationDbContext users)
        {
            usersDatabase = users;
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

        [HttpPost]
        [Authorize]
        public ActionResult Upload(IFormFile uploadedFile)
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            string fileName;
            if (uploadedFile != null)
            {
                fileName = System.IO.Path.GetFileName(uploadedFile.FileName);
                string filePath = _appEnvironment.WebRootPath + "~/Files/" + fileName;
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadedFile.CopyTo(stream);
                }
                person.ImagePath = fileName;
            }
            return RedirectToAction("PersonalArea", "Home");
        }
    }
}
