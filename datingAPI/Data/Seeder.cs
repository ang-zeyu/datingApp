using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using datingAPI.Data.SeedData;
using datingAPI.Models;
using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

namespace datingAPI.Data
{
    public class Seeder
    {
        private DataContext _dbContext;
        private AuthRepository _authRepository;

        public Seeder(DataContext dbContext)
        {
            this._dbContext = dbContext;
            this._authRepository = new AuthRepository(dbContext);
        }

        public void SeedUsers()
        {
            string USER_SEED_DATA_PATH = "Data/SeedData/UserSeedData.json";
            string userData = System.IO.File.ReadAllText(USER_SEED_DATA_PATH);
            var userJsonData = JsonConvert.DeserializeObject<List<UserWithPassword>>(userData);

            foreach(UserWithPassword user in userJsonData)
            {
                this._authRepository.Register(user as User, user.Password);
            }
        }
    }
}