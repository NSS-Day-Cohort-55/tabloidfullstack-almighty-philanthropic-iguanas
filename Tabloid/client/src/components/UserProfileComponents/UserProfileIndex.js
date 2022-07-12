import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllActiveUsers } from "../../modules/userProfileManager";
export default function UserProfileIndex(){
    const[userProfiles, setUserProfiles] = useState([]);

    const getProfiles = () =>{
        getAllActiveUsers().then(profiles => {
            setUserProfiles(profiles);
        })

    }
    useEffect(()=>{
        getProfiles()
    }, []);
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