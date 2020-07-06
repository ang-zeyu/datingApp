using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using datingAPI.Dtos;
using datingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace datingAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper) {
            this._context = context;
            this._mapper = mapper;
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

        public async Task<bool> SaveUser(string username, UserForEditDto user)
        {
            User existingUser = await this.GetUser(username);
            if (existingUser == null) {
                return false;
            }

            _mapper.Map(user, existingUser);
            int saved = await this.Save();

            return saved > 0;
        }
    }
}