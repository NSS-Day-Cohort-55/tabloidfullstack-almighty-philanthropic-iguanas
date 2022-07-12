import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllActiveUsers } from "../../modules/userProfileManager";
import UserProfileCard from "./UserProfileCard";
import "../Styles/UserProfileStyles/UserProfileIndex.css"

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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Display Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProfiles.map((profile)=>(
                            <UserProfileCard profile={profile} key={profile.id}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}