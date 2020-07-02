using System.Collections.Generic;
using System.Threading.Tasks;
using datingAPI.Models;

namespace datingAPI.Data
{
    public interface IUserRepository
    {
         void Add(User user);

         void Delete(User user);

         Task<bool> Save();

         Task<User> GetUser(int id);

         Task<IEnumerable<User>> GetUsers(); 
    }
}