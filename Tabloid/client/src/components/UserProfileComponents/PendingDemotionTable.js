import React from "react";
import "../Styles/UserProfileStyles/UserProfileTable.css"

export default function PendingDemotionTable({profile}) {
    let currentUserId = 1;
    
    const demoteProfile = () =>{
        console.log("you did it!!!")
    }
    return(
        <tr>
            <td>{profile.displayName}</td>
            <td>{profile.fullName}</td>
            <td>{profile.email}</td>
            <td>{profile.demoteVoter.name}</td>
            {(currentUserId == profile.demoteVoter.id)?
                <td><button onClick={demoteProfile}>Demote</button></td>
                :
                <td>Demotion requires another Admins vote</td>
            }
        </tr>
    
    );
}