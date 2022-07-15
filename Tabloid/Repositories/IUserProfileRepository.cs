using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAllActiveUserProfiles();
        List<UserProfile> GetAllDeactivedUserProfiles();
        List<UserProfile> GetAllPendingDemotionProfiles();
        UserProfile GetProfileById(int id);
        void UpdateUserProfile(UserProfile profile);
        void UpdateDemotedUserProfile(UserProfile profile);
        void UpdateFullyDemotedUserProfile(UserProfile profile);
    }
}