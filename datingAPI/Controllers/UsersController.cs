using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using datingAPI.Data;
using datingAPI.Dtos;
using datingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace datingAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            IEnumerable<User> users = await _userRepository.GetUsers();
            List<UserResponseDto> userResponses = new List<UserResponseDto>();
            foreach (var user in users)
            {
                userResponses.Add(_mapper.Map<UserResponseDto>(user));
            }
            
            return Ok(userResponses);
        }

        // GET api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            User user = await _userRepository.GetUser(id);
            return Ok(_mapper.Map<UserWithPhotosResponseDto>(user));
        }
    }
}