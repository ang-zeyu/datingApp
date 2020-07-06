using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using datingAPI.Data;
using datingAPI.Dtos;
using datingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

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

        // GET api/users/{username}
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUser(string username)
        {
            User user = await _userRepository.GetUser(username);
            return Ok(_mapper.Map<UserWithPhotosResponseDto>(user));
        }

        // PUT api/users/{username}
        [HttpPut("{username}")]
        public async Task<IActionResult> EditUser(string username, UserForEditDto user)
        {
            string currentUser = User.FindFirstValue(ClaimTypes.Name);
            if (username != currentUser) {
                return Unauthorized();
            }

            if (await _userRepository.SaveUser(username, user)) {
                return NoContent();
            } else {
                throw new System.Exception($"Could not update user {username}!");
            };
        }
    }
}