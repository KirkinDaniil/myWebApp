using System;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using WolfApi.Models;
using WolfApi.Models.ViewModels;
using WolfFront.Models.ViewModels;

namespace WolfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        ApplicationDbContext usersDatabase;
        public AccountController(ApplicationDbContext users)
        {
            usersDatabase = users;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterModel newUser)
        {
            if (ModelState.IsValid)
            {
                User person = usersDatabase.Users.FirstOrDefault(x => x.Email == newUser.Email);
                if (person == null)
                {
                    var guid = Guid.NewGuid().ToString();
                    usersDatabase.Users.Add(new User {Gender = newUser.Gender, Surname = newUser.Surname, 
                        Name = newUser.Name, Login = newUser.Login, Email = newUser.Email, Password = newUser.Password, Token = guid });
                    await usersDatabase.SaveChangesAsync();
                    var validToken = guid;

                    var host = Request.Host;
                    // отправитель - устанавливаем адрес и отображаемое в письме имя
                    var m = new MimeMessage();
                    m.From.Add(new MailboxAddress("Daniil", "wolfskills2020@gmail.com"));
                    m.To.Add(new MailboxAddress("NewUser", newUser.Email));
                    // тема письма
                    m.Subject = "Подтверждение регистрации";
                    // текст письма
                    var body = new BodyBuilder();
                    body.HtmlBody = $"<a href = 'https://wolfskillsproject.azurewebsites.net/api/Account?guid={validToken}'> confirm </a>";
                    m.Body = body.ToMessageBody();
                    // письмо представляет код html
                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 587, false);
                        client.Authenticate("wolfskills2020@gmail.com", "iVmBqAyy");
                        client.Send(m);
                        client.Disconnect(true);
                    }
                    return Ok(newUser);
                }
            }
            return BadRequest(newUser);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string guid)
        {
            User person = usersDatabase.Users.FirstOrDefault(x=>x.Token==guid&&x.Token!=null);
            if (person!=null)
            {
                person.EmailConfirmed = true;
                person.IsActive = true;
                await usersDatabase.SaveChangesAsync();
                return Ok("Почта успешно подтверждена");
            }
            return BadRequest("no_such_token");
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> ChangeUserDescription([FromBody]AdditionalInfo model)
        {
            string personEmail = User.Identity.Name;
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == personEmail && x.IsActive);
            if (person != null)
            {
                person.BirthDate = model.BirthDate.Date;
                person.Gender = model.Gender;
                person.About = model.About;
                await usersDatabase.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Not logined");
        }
    }
}