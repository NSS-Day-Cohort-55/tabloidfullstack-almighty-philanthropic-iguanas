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
        void AddPost(Post post);
        void UpdatePost(Post post);
        void DeletePost(int id);

        List<string> GetPostReactionCounts(int postId);

        void HandlePostReaction(int postId, int reactionId, int userId);


        List<Post> GetPostsByCategory(int categoryId);
    }
}
