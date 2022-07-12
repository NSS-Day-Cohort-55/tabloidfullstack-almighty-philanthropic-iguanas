import React from "react";
import "../Styles/UserProfileStyles/UserProfileTable.css"

export default function UserProfileTable({profile}) {
    return(
        <tr>
            <td>{profile.displayName}</td>
            <td>{profile.fullName}</td>
            <td>{profile.email}</td>
            <td>{profile.userType.name}</td>
            <td>Delete | Edit</td>
        </tr>
    
    );
}