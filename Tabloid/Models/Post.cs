using System;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }
        public DateTime PublishDateTime { get; set; }

        public Boolean IsApproved { get; set; }
        public int CategoryId { get; set; }
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public Category Category { get; set; }

        public double EstimatedReadTime
        {
            get
            {
                char[] delimiters = new char[] { ' ', '\r', '\n' };
                double wordCount = Content.Split(delimiters, StringSplitOptions.RemoveEmptyEntries).Length;
                double estimatedReadTime = Math.Round(wordCount / 265);
                return estimatedReadTime;
            }
        }

    }
}
