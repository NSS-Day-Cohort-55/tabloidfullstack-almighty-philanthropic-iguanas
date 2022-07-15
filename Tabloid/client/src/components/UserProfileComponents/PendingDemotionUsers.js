import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getAllPendingDemotionUsers } from "../../modules/userProfileManager";
import PendingDemotionTable from "./PendingDemotionTable";
import "../Styles/UserProfileStyles/UserProfileTable.css"


export default function PendingDemotionUsers({user}){
    const[userProfiles, setUserProfiles] = useState([]);

    const getProfiles = () =>{
        getAllPendingDemotionUsers().then(profiles => {
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
                            <th>Demoted By</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProfiles.map((profile)=>(
                            <PendingDemotionTable profile={profile} key={profile.id} user={user}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

