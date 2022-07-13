using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [HttpGet("GetUsersPosts/{userId}")]
        public IActionResult GetUsersPosts(int userId)
        {
            return Ok(_postRepository.GetUsersPosts(userId));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("GetCategoryPosts/{categoryId}")]
        public IActionResult GetPostsByCategory(int categoryId)
        {
            var post = _postRepository.GetPostsByCategory(categoryId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    }
}
