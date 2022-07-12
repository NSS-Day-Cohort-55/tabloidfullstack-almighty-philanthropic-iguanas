import React from "react";
import { Link } from "react-router-dom";

export default function DeactivatedUsers(){
    return(
        <div>
            <h2>Deactivated User Profiles</h2>
            <div>
            <Link to={`/userProfiles/`}>
                <p>Active Users</p>
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
