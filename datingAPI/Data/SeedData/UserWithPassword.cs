using datingAPI.Models;

namespace datingAPI.Data.SeedData
{
    public class UserWithPassword : User
    {
        public string Password { get; set; }

        public User ToUser()
        {
            return new User
            {
                Id = this.Id,
                Username = this.Username,
                PasswordHash = this.PasswordHash,
                PasswordSalt = this.PasswordSalt,
                Gender = this.Gender,
                DateOfBirth = this.DateOfBirth,
                DisplayName = this.DisplayName,
                Created = this.Created,
                LastActive = this.LastActive,
                Introduction = this.Introduction,
                LookingFor = this.LookingFor,
                Interests = this.Interests,
                City = this.City,
                Country = this.Country,
                Photos = this.Photos
            };
        }
    }
}