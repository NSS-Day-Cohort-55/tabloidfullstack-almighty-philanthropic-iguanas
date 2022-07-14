import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import  {CategoryList}  from "./Category/CategoryList";
import {CreateCategory} from "./Category/CreateCategory";
import  {EditCategory}  from "./Category/EditCategory";
import UserProfileIndex from "./UserProfileComponents/UserProfileIndex";
import DeactivatedUsers from "./UserProfileComponents/DeactivatedUsers";
import PendingDemotionUsers from "./UserProfileComponents/PendingDemotionUsers";
import { TagEditForm } from "./Tags/TagEditForm";
import TagList from "./Tags/TagList";
import UserProfileDetails from "./UserProfileComponents/UserProfileDetails";
import UserProfileEdit from "./UserProfileComponents/UserProfileEdit";
import TagForm from "./Tags/TagForm";
import Posts from "./Post/Posts";
import MyPosts from "./Post/MyPosts";
import PostDetails from "./Post/PostDetails";
import CreatePost from "./Post/CreatePost";

export default function ApplicationViews({ isLoggedIn, user }) {
  
  
  
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="createcategory" element={<CreateCategory />} />
            <Route path="edit/:categoryId" element={<EditCategory />} />
          </Route>

          <Route path="posts" element={<Posts user={user} />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route path="posts/CreatePost" element={<CreatePost user={user} />} />
          <Route path="myPosts" element={<MyPosts user={user}/>} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userProfiles">
            <Route index element={<UserProfileIndex/>}/>
            <Route path="deactivatedUsers" element={<DeactivatedUsers/>}/>
            <Route path="pendingDemotionUsers" element={<PendingDemotionUsers/>}/>
            <Route path=":id" element={<UserProfileDetails/>}/>
            <Route path="Edit/:id" element={<UserProfileEdit/>}/>
          </Route>
          <Route Exact path="tags">
            <Route index element={<TagList />} />
            <Route path="add" element={<TagForm />} />
            <Route path="edit/:tagId" element={<TagEditForm />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}
