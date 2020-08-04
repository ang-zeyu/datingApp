using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using datingAPI.Data;
using datingAPI.Dtos;
using datingAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration, IMapper mapper)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        // POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(BasicUser user)
        {
            if (await _authRepository.UserExists(user.Username))
            {
                return BadRequest("User already exists!");
            }

            User userToRegister = _mapper.Map<User>(user);
            User registeredUser = await _authRepository.Register(userToRegister, user.Password);
            if (registeredUser == null)
            {
                return BadRequest("Validation failed!");
            }

            return CreatedAtRoute("GetUser", new
                {
                    controller = "Users",
                    username = registeredUser.Username
                },
                _mapper.Map<UserResponseDto>(registeredUser));
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(BasicUser user)
        {
            User retrievedUser = await _authRepository.Login(user.Username, user.Password);
            if (retrievedUser == null)
            {
                return Unauthorized();
            }

            System.Security.Claims.Claim[] claims = new System.Security.Claims.Claim[] {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, retrievedUser.Id.ToString()),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, retrievedUser.Username.ToString())
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(
                this._configuration.GetSection("AppSettings:Key").Value
            ));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor {
                Subject = new System.Security.Claims.ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            JwtSecurityTokenHandler h = new JwtSecurityTokenHandler();
            SecurityToken token = h.CreateToken(descriptor);

            return Ok(new
            {
               token = h.WriteToken(token),
               user = _mapper.Map<UserResponseDto>(retrievedUser)
            });
        }
    }
}
