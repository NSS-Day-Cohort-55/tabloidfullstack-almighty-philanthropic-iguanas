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
            userTypeId:0,
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
    const handleSelect = (profileForm) => {
        const profileToEdit = {...profile};
        let userTypeElement = document.getElementById("userType")
        let value = userTypeElement.value
        
        if(value == 1){
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

    const saveChanges = () =>{
        console.log(profile);
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
                    <select id="userType" htmlFor="UserTypeId" className="form-control" onChange={handleSelect}>
                        <option id="admin" value="1">Administrator</option>
                        <option id="auth" value="2">Author</option>
                    </select>
                    {/* <span asp-validation-for="UserTypeId" className="text-danger"></span> */}
                </div>
                <div className="form-group">
                    <h5>Status (The User is Active)</h5>
                    <label htmlFor="isActive" className="control-label"></label>
                    <input onChange={handleEdit} type="text" id="isActive" name="isActive" className="form-control" value={profile.isActive} />
                    {/* <span asp-validation-for="DemoteVoteOne" className="text-danger"></span> */}
                </div>
                
                <div className="form-group">
                    <button onClick={saveChanges}>Save Changes</button>
                </div>
            </div>
                
        </div>

        
        
        
    );
}