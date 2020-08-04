using System;
using System.ComponentModel.DataAnnotations;

namespace datingAPI.Dtos
{
    public class BasicUser
    {
        [Required]
        [StringLength(10, MinimumLength=4, ErrorMessage="Username should be between 4 and 10 characters long")]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public BasicUser()
        {
            this.Created = DateTime.Now;
            this.LastActive = DateTime.Now;
        }
    }
}