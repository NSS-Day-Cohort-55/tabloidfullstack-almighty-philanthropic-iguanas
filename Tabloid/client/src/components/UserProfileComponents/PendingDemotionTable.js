import React from "react";
import "../Styles/UserProfileStyles/UserProfileTable.css"

export default function PendingDemotionTable({profile}) {
    return(
        <tr>
            <td>{profile.displayName}</td>
            <td>{profile.fullName}</td>
            <td>{profile.email}</td>
            <td>{profile.demoteVoter.fullName}</td>
            <td>Demote</td>
        </tr>
    
    );
}