using System.Collections.Generic;
using System.Threading.Tasks;
using datingAPI.Dtos;
using datingAPI.Models;

namespace datingAPI.Data
{
    public interface IUserRepository
    {
         void Add(User user);

         void Delete(User user);

         Task<int> Save();

         Task<User> GetUser(string username);

         Task<Photo> GetPhoto(int id);

         Task<IEnumerable<User>> GetUsers(); 

         Task<bool> SaveUser(string username, UserForEditDto user);
    }
}