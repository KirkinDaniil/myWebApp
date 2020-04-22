using System;
using System.ComponentModel.DataAnnotations;

namespace WolfFront.Models.ViewModels
{
    public class AdditionalInfo
    {
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        public bool Gender { get; set; }

        [DataType(DataType.Text)]
        public string About { get; set; }
    }
}
