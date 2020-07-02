using System;
using System.Linq;
using AutoMapper;
using datingAPI.Models;

namespace datingAPI.Dtos
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserResponseDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(src => GetAge(src.DateOfBirth)));
            
            CreateMap<User, UserWithPhotosResponseDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(src => GetAge(src.DateOfBirth)));
            
            CreateMap<Photo, PhotoResponseDto>();
        }

        private static int GetAge(DateTime dateTime)
        {
            int age = DateTime.Now.Year - dateTime.Year;
            return dateTime.AddYears(age) > DateTime.Now
                ? age
                : age - 1;
        }
    }
}