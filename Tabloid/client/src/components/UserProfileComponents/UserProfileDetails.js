import React, {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../../modules/userProfileManager";


export default function UserProfileDetails()
{
    const {id} = useParams();
    const[profile, setProfile] = useState(
        {
            fullName: "",
            displayName:"",
            email:"",
            isActive: true,
            image:"",
            userType:{
                name:""
            },
            createDateTime:""
        });
    
    
    

    useEffect(()=>{
        getUserProfileById(id).then(profile => {
            setProfile(profile);
        })
    }, []);

    return(
        <>
            
        <h3>Details</h3>
        
        <div>
            <img src={profile.imageLocation} alt="Yikes"></img>
        </div>
        <div>
            <p>Full Name: {profile.fullName}</p>
            <p>Display Name: {profile.displayName}</p>
            <p>Email: {profile.email}</p>
            <p>Date Joined: {profile.createDateTime.slice(0,10)}</p>
            <p>User type: {profile.userType.name}</p>
            {(profile.isActive)?<p>Status: Active</p>:<p>Status: Inactive</p>}
            
        </div>
                
        </>
    );
}