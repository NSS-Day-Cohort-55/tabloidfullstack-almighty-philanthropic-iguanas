using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("GetCurrentUserInfo")]
        public IActionResult GetLoggedInUser()
        {
            UserProfile user = GetCurrentUserProfile();
            user.FirebaseUserId = "lol you can't see this";
            return Ok(user);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpGet]
        public IActionResult GetAllActiveUsers()
        {
            return Ok(_userProfileRepository.GetAllActiveUserProfiles());

        }

        [HttpGet("GetDeactivated")]
        public IActionResult GetAllDeactivedUsers()
        {
            return Ok(_userProfileRepository.GetAllDeactivedUserProfiles());

        }

        [HttpGet("GetPendingDemotions")]
        public IActionResult GetAllPendingDemotions()
        {
            return Ok(_userProfileRepository.GetAllPendingDemotionProfiles());

        }

        [HttpGet("Details/{id}")]
        public IActionResult GetProfileByUserId(int id)
        {
            var userProfile = _userProfileRepository.GetProfileById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPut("Edit")]
        public ActionResult Edit(UserProfile profile)
        {
            _userProfileRepository.UpdateUserProfile(profile);
            return NoContent();
            

        }

        [HttpPut("EditDemoted")]
        public ActionResult EditDemoted(UserProfile profile)
        {
           _userProfileRepository.UpdateDemotedUserProfile(profile);
            return NoContent();
        }

        [HttpPut("EditFullDemotion")]
        public ActionResult EditFullDemotion(UserProfile profile)
        {
            _userProfileRepository.UpdateFullyDemotedUserProfile(profile);
            return NoContent();
        }

    }
}
