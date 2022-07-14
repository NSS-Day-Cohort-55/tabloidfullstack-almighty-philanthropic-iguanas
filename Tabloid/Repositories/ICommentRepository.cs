using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPostId(int id);
        Comment GetCommentById(int id);
        void AddComment(Comment comment);
        void DeleteComment(int id);

        void UpdateComment(Comment comment);

    }
}
