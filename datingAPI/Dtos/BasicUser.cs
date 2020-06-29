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
    }
}