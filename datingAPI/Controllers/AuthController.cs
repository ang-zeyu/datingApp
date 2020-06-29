using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using datingAPI.Data;
using datingAPI.Dtos;
using datingAPI.Models;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository  = authRepository;
        }

        // POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(BasicUser user)
        {
            if (await _authRepository.UserExists(user.Username))
            {
                return BadRequest("User already exists!");
            }

            User registeredUser = await _authRepository.Register(user.Username, user.Password);
            if (registeredUser == null)
            {
                return BadRequest("Validation failed!");
            }

            return StatusCode(201);
        }
    }
}
