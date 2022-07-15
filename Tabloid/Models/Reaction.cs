using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Url]
        public string ImageLocation { get; set; }
    }
}