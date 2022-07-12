import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getAllActiveUsers } from "../../modules/userProfileManager";
import UserProfileTable from "./UserProfileTable";


export default function PendingDemotionUsers(){
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

