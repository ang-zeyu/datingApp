using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using datingAPI.Data;
using datingAPI.Dtos;
using datingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace datingAPI.Controllers
{
    [Authorize]
    [Route("api/users/{username}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IUserRepository userRepository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            Photo photo = await _userRepository.GetPhoto(id);

            PhotoCloudinaryResponseDto responsePhoto = _mapper.Map<PhotoCloudinaryResponseDto>(photo);

            return Ok(responsePhoto);
        }

        private void UploadPhotoToCloudinary(PhotoCreationDto photoCreationDto)
        {
            ImageUploadResult result = new ImageUploadResult();

            if (photoCreationDto.File.Length > 0)
            {
                using (Stream stream = photoCreationDto.File.OpenReadStream())
                {
                    ImageUploadParams uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(photoCreationDto.File.Name, stream),
                        Transformation = new Transformation().Width(250).Height(250).Gravity("faces").Crop("fill")
                    };
                    result = _cloudinary.Upload(uploadParams);
                }
            }

            photoCreationDto.Url = result.Url.ToString();
            photoCreationDto.PublicId = result.PublicId;
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(string username, [FromForm] PhotoCreationDto photoCreationDto)
        {
            string currentUser = User.FindFirstValue(ClaimTypes.Name);
            if (username != currentUser) {
                return Unauthorized();
            }

            if (photoCreationDto.File == null)
            {
                return BadRequest("No photo file received for request.");
            }

            User user = await _userRepository.GetUser(username);

            UploadPhotoToCloudinary(photoCreationDto);

            Photo photo = _mapper.Map<Photo>(photoCreationDto);

            bool hasMainPhoto = user.Photos.Any(p => p.IsMain);
            if (!hasMainPhoto)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            int numChanges = await _userRepository.Save();
            if (numChanges == 0)
            {
                throw new System.Exception($"Could not save your photos!");
            }


            return CreatedAtRoute("GetPhoto", new { id = photo.Id, username = username }, _mapper.Map<PhotoCloudinaryResponseDto>(photo));
        }

        [HttpDelete("{id}", Name = "DelPhoto")]
        public async Task<IActionResult> DeletePhotoForUser(string username, int id)
        {
            string currentUser = User.FindFirstValue(ClaimTypes.Name);
            if (username != currentUser) {
                return Unauthorized();
            }

            User user = await _userRepository.GetUser(username);
            if (!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            Photo photo = await _userRepository.GetPhoto(id);
            if (photo == null)
            {
                return BadRequest("Photo does not exist!");
            }
            else if (photo.IsMain)
            {
                return BadRequest("Can't delete main photo!");
            }

            if (photo.PublicId != null)
            {
                DeletionParams delParams = new DeletionParams(photo.PublicId);
                DeletionResult delResult = _cloudinary.Destroy(delParams);
                if (delResult.Result != "ok")
                {
                    return BadRequest("Failed to delete photo"); 
                }
            }

            await _userRepository.DeletePhoto(id);

            int numChanges = await _userRepository.Save();
            if (numChanges == 0)
            {
                throw new System.Exception("Could not delete your photo!");
            }

            return Ok();
        }

        [HttpPost("main/{id}")]
        public async Task<IActionResult> SetMainPhotoForUser(string username, int id)
        {
            string currentUser = User.FindFirstValue(ClaimTypes.Name);
            if (username != currentUser) {
                return Unauthorized();
            }

            User user = await _userRepository.GetUser(username);

            Photo photo = user.Photos.FirstOrDefault(photo => photo.Id == id);
            if (photo == null) {
                return BadRequest();
            }

            foreach (Photo p in user.Photos) {
                p.IsMain = p.Id == id;
            }
            
            int numChanges = await _userRepository.Save();
            if (numChanges == 0)
            {
                throw new System.Exception("Could not change the main photo!");
            }

            return Ok();
        }
    }
}