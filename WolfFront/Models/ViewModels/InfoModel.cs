using System;
using System.ComponentModel.DataAnnotations;

namespace WolfApi.Models.ViewModels
{
    public class InfoModel
    {
        [Required(ErrorMessage = "Не указан Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указано имя")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Не указана Фамилия")]
        [DataType(DataType.Text)]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Не указан логин")]
        [DataType(DataType.Text)]
        public string Login { get; set; }
    }
}
