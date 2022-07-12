import React from "react";
import { Link } from "react-router-dom";

export default function PendingDemotionUsers(){
    return(
        <div>
            <h2>Pending Demotions</h2>
            <div>
                <Link to={`/userProfiles/`}>
                    <p>Active Users</p>
                </Link>
                <p>|</p>
                <Link to={`/userProfiles/deactivatedUsers`}>
                    <p>Deactivated Users</p>
                </Link>
            </div>
            <p>Pretend I am a list of user profiles</p>
        </div>
    );
}

