import React from "react";
import { Link } from "react-router-dom";

export default function UserProfileIndex(){
    return(
        <div>
            <h2>User Profiles</h2>
            <div>
                <Link to={`/userProfiles/deactivatedUsers`}>
                    <p>Deactivated Users</p>
                </Link>
                <p>|</p>
                <Link to={`/userProfiles/pendingDemotionUsers`}>
                    <p>Pending Demotions</p>
                </Link>
            </div>
            <p>Pretend I am a list of user profiles</p>
        </div>
    );
}