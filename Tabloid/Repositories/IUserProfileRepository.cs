﻿using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        public List<UserProfile> GetAllActiveUserProfiles();
        public List<UserProfile> GetAllDeactivedUserProfiles();
    }
}