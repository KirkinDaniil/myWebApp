using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WolfApi.Models;
using WolfApi.Models.ViewModels;

namespace WolfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        ApplicationDbContext usersDatabase;
        public LoginController(ApplicationDbContext users)
        {
            usersDatabase = users;
        }

        [HttpPost("/token")]
        public async Task<IActionResult> Token([FromBody]LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var identity = GetIdentity(loginModel.Email, loginModel.Password);
                if (identity == null)
                {
                    Response.StatusCode = 400;
                    return BadRequest("Invalid username or password.");
                }

                var now = DateTime.UtcNow;
                // создаем JWT-токен
                var jwt = new JwtSecurityToken(
                        issuer: WolfApi.AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    username = loginModel.Email
                };

                // сериализация ответа
                Response.ContentType = "application/json";
                await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            return BadRequest(loginModel);
        }

        [HttpGet]
        [Authorize]
        public IActionResult IsLogined()
        {
            return Ok();
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            User person = usersDatabase.Users.FirstOrDefault(x => x.Email == username && x.Password == password && x.IsActive);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
