using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        Tag GetById(int id);
        void AddTag(Tag tag);
        void UpdateTag(Tag tag);    
        void RemoveTag(int id);
    }
}
