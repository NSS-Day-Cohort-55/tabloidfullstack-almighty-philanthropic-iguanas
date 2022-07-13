import React from "react";
//import "../Styles/UserProfileStyles/UserProfileCard.css"

export default function UserProfileCard({profile}) {
    return(
        <tr>
            <td>{profile.displayName}</td>
            <td>{profile.fullName}</td>
            <td>{profile.email}</td>
            <td>{profile.userType.name}</td>
        </tr>
    
    );
}