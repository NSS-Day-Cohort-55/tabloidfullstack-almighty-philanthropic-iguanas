import React, {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../../modules/userProfileManager";


export default function UserProfileDetails()
{
    const {id} = useParams();
    const[profile, setProfile] = useState(
        {
            fullName: "",
            email:"",
            isActive: true,
            image:"",
            userType:{
                name:""
            }
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
            <p>Email: {profile.email}</p>
            <p>Date Joined: This should be a date</p>
            <p>User type: {profile.userType.name}</p>
            {(profile.isActive)?<p>Status: Active</p>:<p>Status: Inactive</p>}
            
        </div>
                
        </>
    );
}