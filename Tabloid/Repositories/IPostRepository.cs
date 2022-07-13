using System;
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPublishedPosts();
        List<Post> GetUsersPosts(int userId);
        Post GetPublishedPostById(int id);
    }
}
