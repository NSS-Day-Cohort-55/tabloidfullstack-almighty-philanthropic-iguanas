import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDeactivatedUsers } from "../../modules/userProfileManager";
import UserProfileTable from "./UserProfileTable";
import "../Styles/UserProfileStyles/UserProfileTable.css"

export default function DeactivatedUsers(){
    const[userProfiles, setUserProfiles] = useState([]);

    const getProfiles = () =>{
        getAllDeactivatedUsers().then(profiles => {
            setUserProfiles(profiles);
        })
    }
    useEffect(()=>{
        getProfiles()
    }, []);
    
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Display Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProfiles.map((profile)=>(
                            <UserProfileTable profile={profile} key={profile.id}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
