using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }
        public void AddReaction(Reaction reaction)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Reaction ( Name, ImageLocation)
                    OUTPUT INSERTED.ID
                    VALUES (@Name, @ImageLocation );
                ";

                    cmd.Parameters.AddWithValue("@Name", reaction.Name);
                    cmd.Parameters.AddWithValue("@ImageLocation", reaction.ImageLocation);

                    int id = (int)cmd.ExecuteScalar();

                    reaction.Id = id;
                }
            }
        }
    }
}
