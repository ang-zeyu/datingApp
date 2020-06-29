using System.Threading.Tasks;
using datingAPI.Models;

namespace datingAPI.Data {
    public interface IAuthRepository {
        Task<User> Login(string username, string password);

        Task<User> Register(string username, string password);

        Task<bool> UserExists(string username);
    }
}