using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using System;

namespace Tabloid.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId, up.IsActive, up.DemoteVote,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            DemoteVoter = new Voter()
                            {
                                Id = DbUtils.GetInt(reader, "DemoteVote")
                            },
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ImageLocation, UserTypeId, IsActive, DemoteVote)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ImageLocation, @UserTypeId, 1, 0)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAllActiveUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                        up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId, up.IsActive, up.DemoteVote,
                        ut.Name AS UserTypeName
                        FROM UserProfile up
                        LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                        WHERE IsActive = 1
                        ORDER BY up.DisplayName
                    ";

                    List<UserProfile> userProfiles = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                       UserProfile userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            DemoteVoter =  new Voter()
                            {
                                Id = DbUtils.GetInt(reader, "DemoteVote")
                            },
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                        userProfiles.Add(userProfile);
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public List<UserProfile> GetAllDeactivedUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                        up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId, up.IsActive, up.DemoteVote,
                        ut.Name AS UserTypeName
                        FROM UserProfile up
                        LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                        WHERE IsActive = 0
                        ORDER BY up.DisplayName
                    ";

                    List<UserProfile> userProfiles = new List<UserProfile>();
                    UserProfile DemoteVoter = new UserProfile();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            DemoteVoter = new Voter()
                            {
                                Id = DbUtils.GetInt(reader, "DemoteVote"),
                            },
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                        userProfiles.Add(userProfile);
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public List<UserProfile> GetAllPendingDemotionProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime,up.UserTypeId, up.DemoteVote, dv.FirstName AS DemotedByFirst, dv.LastName AS DemotedByLast
                        FROM UserProfile up
                        JOIN UserProfile dv ON up.DemoteVote = dv.Id
                        WHERE up.DemoteVote > 0;
                    ";

                    List<UserProfile> userProfiles = new List<UserProfile>();
                    
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            DemoteVoter = new Voter()
                            {
                                Id = DbUtils.GetInt(reader, "DemoteVote"),
                                Name = DbUtils.GetString(reader, "DemotedByFirst") + " " + DbUtils.GetString(reader, "DemotedByLast"),
                            }
                            
                        };
                        userProfiles.Add(userProfile);
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public UserProfile GetProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId, up.IsActive, up.DemoteVote,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            DemoteVoter = new Voter()
                            {
                                Id = DbUtils.GetInt(reader, "DemoteVote")
                            },
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void UpdateUserProfile(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET 
                                DisplayName = @displayName,
                                FirstName = @firstName,
                                LastName = @lastName,
                                Email = @email,
                                ImageLocation = @imageLocation,
                                UserTypeId = @userTypeId,
                                IsActive = @isActive
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@displayName", profile.DisplayName);
                    cmd.Parameters.AddWithValue("@firstName", profile.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", profile.LastName);
                    cmd.Parameters.AddWithValue("@email", profile.Email);
                    cmd.Parameters.AddWithValue("@userTypeId", profile.UserTypeId);
                    cmd.Parameters.AddWithValue("@isActive", profile.IsActive);

                    //Nullable value
                    if (profile.ImageLocation == null)
                    {
                        cmd.Parameters.AddWithValue("@imageLocation", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@imageLocation", profile.ImageLocation);
                    }

                    cmd.Parameters.AddWithValue("@id", profile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateDemotedUserProfile(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET 
                                DisplayName = @displayName,
                                FirstName = @firstName,
                                LastName = @lastName,
                                Email = @email,
                                ImageLocation = @imageLocation,
                                UserTypeId = 1,
                                IsActive = @isActive,
                                DemoteVote = @demoteVote
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@displayName", profile.DisplayName);
                    cmd.Parameters.AddWithValue("@firstName", profile.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", profile.LastName);
                    cmd.Parameters.AddWithValue("@email", profile.Email);
                    //userTypeId is hardcoded to remain one, so that a second demote vote is required
                    cmd.Parameters.AddWithValue("@isActive", profile.IsActive);
                    //The first person to demote the profile is recoreded below
                    cmd.Parameters.AddWithValue("@demoteVote", profile.DemoteVoter.Id);

                    //Nullable value
                    if (profile.ImageLocation == null)
                    {
                        cmd.Parameters.AddWithValue("@imageLocation", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@imageLocation", profile.ImageLocation);
                    }

                    cmd.Parameters.AddWithValue("@id", profile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateFullyDemotedUserProfile(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET 
                                UserTypeId = 2,
                                DemoteVote = 0
                            WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", profile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        /*
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }
}
