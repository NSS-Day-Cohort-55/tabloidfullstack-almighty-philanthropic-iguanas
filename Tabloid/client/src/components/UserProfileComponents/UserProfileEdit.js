import React, {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../../modules/userProfileManager";

export default function UserProfileEdit(){
    const {id} = useParams();
    const[profile, setProfile] = useState(
        {
            id:0,
            firstName:"",
            lastName:"",
            displayName:"",
            email:"",
            isActive: true,
            imageLocation:"",
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

    const handleEdit = (profileForm) =>{
        const profileToEdit = {...profile};
        profileToEdit[profileForm.target.id] = profileForm.target.value;
        setProfile(profileToEdit)
    }

    const saveChanges = () =>{
        console.log("goody");
        console.log(profile);
    }

    return(
        
        <div>
            <h2>Edit Profile</h2>
            <hr />

            <div className="userProfileEditFormBody">
                {/* The Id is stored here, but not allowed to be changed */}
                <input onChange={handleEdit} htmlFor="Id" type="hidden" class="form-control" />
                <div class="form-group">
                    <h5>FirstName</h5>
                    <label htmlFor="firstName" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="firstName" name="firstName" class="form-control" value={profile.firstName} />
                    {/* <span asp-validation-for="FirstName" class="text-danger"></span> */}
                </div>
                <div class="form-group">
                    <h5>LastName</h5>
                    <label htmlFor="lastName" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="lastName" name="lastName" class="form-control" value={profile.lastName} />
                    {/* <span asp-validation-for="LastName" class="text-danger"></span> */}
                </div>
                <div class="form-group">
                    <h5>Display Name</h5>
                    <label htmlFor="displayName" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="displayName" name="displayName" class="form-control" value={profile.displayName} />
                    {/* <span asp-validation-for="DisplayName" class="text-danger"></span> */}
                </div>
                <div class="form-group">
                    <h5>Email</h5>
                    <label htmlFor="email" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="email" name="email" class="form-control" value={profile.email}/>
                    {/* <span asp-validation-for="Email" class="text-danger"></span> */}
                </div>
                <input onChange={handleEdit} htmlFor="CreateDateTime" type="hidden" class="form-control" />
                <div class="form-group">
                    <h5>Image Location</h5>
                    <label htmlFor="imageLocation" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="imageLocation" name="imageLocation" class="form-control" value={profile.imageLocation}/>
                    {/* <span asp-validation-for="ImageLocation" class="text-danger"></span> */}
                </div>
                <div class="form-group">
                    <h5>User Type</h5>
                    <label htmlFor="UserTypeId" class="control-label"></label>
                    <select id="userType" htmlFor="UserTypeId" class="form-control" onchange="changeUserType()">
                        <option id="admin" value="1">Administrator</option>
                        <option id="auth" value="2">Author</option>
                    </select>
                    {/* <span asp-validation-for="UserTypeId" class="text-danger"></span> */}
                </div>
                <div class="form-group">
                    <h5>Status (The User is Active)</h5>
                    <label htmlFor="isActive" class="control-label"></label>
                    <input onChange={handleEdit} type="text" id="isActive" name="isActive" class="form-control" value={profile.isActive} />
                    {/* <span asp-validation-for="DemoteVoteOne" class="text-danger"></span> */}
                </div>
                
                <div class="form-group">
                    <button onClick={saveChanges}>Save Changes</button>
                </div>
            </div>
                
        </div>

        
        
        
    );
}