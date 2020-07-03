using System.Collections.Generic;
using System.Threading.Tasks;
using datingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace datingAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) {
            this._context = context;
        }

        public void Add(User user)
        {
            _context.Add(user);
        }

        public void Delete(User user)
        {
            _context.Remove(user);
        }

        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<User> GetUser(string username)
        {
            return await _context.Users.Include(usr => usr.Photos).FirstOrDefaultAsync(usr => usr.Username.ToLower() == username);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(usr => usr.Photos).ToListAsync();
        }
    }
}