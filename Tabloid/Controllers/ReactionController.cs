using System;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }


        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepository.AddReaction(reaction);
            return CreatedAtAction("Get", new { id = reaction.Id }, reaction);
        }
    }
}
