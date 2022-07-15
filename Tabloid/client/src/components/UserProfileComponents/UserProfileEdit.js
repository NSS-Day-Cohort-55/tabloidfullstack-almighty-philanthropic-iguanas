import React, {useState, useEffect}from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileById, updateDemotedProfile, updateProfile } from "../../modules/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileEdit(){
    const navigate = useNavigate();
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
            userTypeId:0,
            createDateTime:"",
            demoteVoter:{
                id:0
            }
        });
    //This will track if the profile was demoted or not by checking to see if they are currently an admin, when the page loads
    const[isAdminStatus, setIsAdminStatus] = useState(false)

    //Need something here to get ahold of the current user's Id
    let currentUserId = 1;
    
    useEffect(()=>{
        getUserProfileById(id).then(profile => {
            setProfile(profile);
            if(profile.userTypeId == 1){
                setIsAdminStatus(true)
            }
            
        })
    }, []);

    const handleEdit = (profileForm) =>{
        //this will handle all text inputs
        const profileToEdit = {...profile};
        profileToEdit[profileForm.target.id] = profileForm.target.value;
        setProfile(profileToEdit)
    }
    const handleSelect = (profileForm) => {
        //this will handle selecting author or admin
        const profileToEdit = {...profile};
        let userTypeElement = document.getElementById("userType")
        let value = userTypeElement.value
        
        if(value === 1){
            profileToEdit.userType.name = "Admin"
            profileToEdit.userType.id = 1
            profileToEdit.userTypeId = 1
            setProfile(profileToEdit)
        }else{
            profileToEdit.userType.name = "Author"
            profileToEdit.userType.id = 2
            profileToEdit.userTypeId = 2
            setProfile(profileToEdit)
        }
    }

    const handleBoolSelect = () => {
        //This will handle changes in isActive status
        const profileToEdit = {...profile};
        let isActiveElement = document.getElementById("isActive")
        let value = isActiveElement.value
        
        if(value === "true"){
            profileToEdit.isActive = true
            setProfile(profileToEdit)
        }else{
            profileToEdit.isActive = false
            setProfile(profileToEdit)
        }

    }

    const saveChanges = () =>{
        if(isAdminStatus){
            if(profile.userTypeId === 2){
                profile.demoteVoter.Id = currentUserId;
                updateDemotedProfile(profile).then(()=>navigate("/userProfiles")) //Id the user is an admin and they were demoted, they need a special put to handle that 
            }else{
                updateProfile(profile).then(()=>navigate("/userProfiles")) //In all other instances you treat the update with this
            }
        }else{
            updateProfile(profile).then(()=>navigate("/userProfiles"))
            
        }
    }

    return(
        
        <div>
            <h2>Edit Profile</h2>
            <hr />

            <div className="userProfileEditFormBody">
                {/* The Id is stored here, but not allowed to be changed */}
                <input onChange={handleEdit} htmlFor="Id" type="hidden" className="form-control" />
                <div className="form-group">
                    <h5>FirstName</h5>
                    <label htmlFor="firstName" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="firstName" name="firstName" className="form-control" value={profile.firstName} />
                    {/* <span asp-validation-for="FirstName" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>LastName</h5>
                    <label htmlFor="lastName" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="lastName" name="lastName" className="form-control" value={profile.lastName} />
                    {/* <span asp-validation-for="LastName" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>Display Name</h5>
                    <label htmlFor="displayName" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="displayName" name="displayName" className="form-control" value={profile.displayName} />
                    {/* <span asp-validation-for="DisplayName" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>Email</h5>
                    <label htmlFor="email" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="email" name="email" className="form-control" value={profile.email}/>
                    {/* <span asp-validation-for="Email" className="text-danger"></span> */}
                </div>
                <input onChange={handleEdit} htmlFor="CreateDateTime" type="hidden" className="form-control" />
                <div className="form-group">
                    <h5>Image Location</h5>
                    <label htmlFor="imageLocation" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="imageLocation" name="imageLocation" className="form-control" value={profile.imageLocation}/>
                    {/* <span asp-validation-for="ImageLocation" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>User Type</h5>
                    <label htmlFor="UserTypeId" className="control-label"></label>
                    {/* This ternary statment ensures that the option that matches the profile is selected in the dropdown box TRY DEFAULT VALUE*/}
                    {(profile.userTypeId === 1)?
                    <select id="userType" htmlFor="UserTypeId" className="form-control" onChange={handleSelect} defaultValue="1">
                        <option id="admin" value="1" >Administrator</option>
                        <option id="auth" value="2" >Author</option>
                    </select>
                    :
                    <select id="userType" htmlFor="UserTypeId" className="form-control" onChange={handleSelect} defaultValue="2">
                        <option id="auth" value="2" >Author</option>
                        <option id="admin" value="1" >Administrator</option>
                    </select>
                    }
                    {/* <span asp-validation-for="UserTypeId" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>Status (The User is Active)</h5>
                    {(profile.isActive)?
                    <select id="isActive" htmlFor="isActive" className="form-control" onChange={handleBoolSelect} defaultValue="true">
                        <option id="active" value="true">Active</option>
                        <option id="inactive" value="false">Inactive</option>
                    </select>
                    :
                    <select id="isActive" htmlFor="isActive" className="form-control" onChange={handleBoolSelect} defaultValue="false">
                        <option id="inactive" value="false">Inactive</option>
                        <option id="active" value="true">Active</option>
                    </select>
                    }
                    {/* <span asp-validation-for="DemoteVoteOne" className="text-danger"></span> */}
                </div>
                
                <div className="form-group">
                    <button onClick={saveChanges}>Save Changes</button>
                    <Link to="/userProfiles"><button>Cancel</button></Link>
                </div>
            </div>
                
        </div>

        
        
        
    );
}