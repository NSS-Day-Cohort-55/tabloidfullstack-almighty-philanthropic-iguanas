import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UserProfileStyles/UserProfileTable.css"
import { updateFullyDemotedProfile } from "../../modules/userProfileManager";

export default function PendingDemotionTable({profile, user}) {
    const navigate = useNavigate();
    let currentUserId = user.id;
    
    const demoteProfile = () =>{
        updateFullyDemotedProfile(profile).then(()=>navigate("/userProfiles"))
    }

    return(
        <tr>
            <td>{profile.displayName}</td>
            <td>{profile.fullName}</td>
            <td>{profile.email}</td>
            <td>{profile.demoteVoter.name}</td>
            {(currentUserId === profile.demoteVoter.id)?
                <td>Demotion requires another Admins vote</td>
                :
                <td><button onClick={demoteProfile}>Demote</button></td>
            }
        </tr>
    
    );
}