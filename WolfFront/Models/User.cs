
using System;

namespace WolfApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Gender { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool EmailConfirmed { get; set; } = false;
        public bool IsActive { get; set; } = false;
        public string Token { get; set; }
        public DateTime BirthDate { get; set; }
        public string About { get; set; }
    }
}
