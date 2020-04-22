using Microsoft.AspNetCore.Mvc;

namespace WolfFront.Controllers
{
    public class HomeController : Controller
    {
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
    }
}
