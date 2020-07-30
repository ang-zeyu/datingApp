using System;
using System.Threading.Tasks;
using System.Security.Cryptography;

using Microsoft.EntityFrameworkCore;

using datingAPI.Models;
using System.Linq;

namespace datingAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context) {
            this._context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            // retrieve user model
            User user = await _context.Users.Include(usr => usr.Photos).FirstOrDefaultAsync(user => user.Username == username);

             // check if user exists
            if (user == null)
            {
                return null;
            }

            // compare hashes
            bool passwordMatches = VerifyHash(user.PasswordHash, user.PasswordSalt, password);
            if (!passwordMatches)
            {
                return null;
            }

            return user;
        }

        private bool VerifyHash(byte[] passwordHash, byte[] passwordSalt, string password)
        {
            HMACSHA512 hmac = new HMACSHA512(passwordSalt);

            return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)).SequenceEqual(passwordHash);
        }

        public async Task<User> Register(string username, string password)
        {
            // check if user exists
            if (await this.UserExists(username))
            {
                return null;
            }

            // validation

            // create password hash, store to db
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            User userToStore = new User();
            userToStore.Username = username;
            userToStore.PasswordHash = passwordHash;
            userToStore.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(userToStore);
            await _context.SaveChangesAsync();

            return userToStore;
        }

        public async Task<User> Register(User user, string password)
        {
            // check if user exists
            if (await this.UserExists(user.Username))
            {
                return null;
            }

            // validation

            // create password hash, store to db
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.Username.ToLower() == username.ToLower());
        }
    }
}