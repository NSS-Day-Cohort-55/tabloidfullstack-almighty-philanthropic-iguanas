import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CategoryList } from "./Category/CategoryList";
import { CreateCategory } from "./Category/CreateCategory";
import { EditCategory } from "./Category/EditCategory";
import UserProfileIndex from "./UserProfileComponents/UserProfileIndex";
import DeactivatedUsers from "./UserProfileComponents/DeactivatedUsers";
import PendingDemotionUsers from "./UserProfileComponents/PendingDemotionUsers";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagFrom";
import Posts from "./Post/Posts";
import MyPosts from "./Post/MyPosts";
import PostDetails from "./Post/PostDetails";
import CreatePost from "./Post/CreatePost";
import PostDetails from "./Post/PostDetails";
export default function ApplicationViews({ isLoggedIn }) {
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
          <Route path="posts" element={<Posts />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route path="myPosts" element={<MyPosts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userProfiles">
            <Route index element={<UserProfileIndex />} />
            <Route path="deactivatedUsers" element={<DeactivatedUsers />} />
            <Route
              path="pendingDemotionUsers"
              element={<PendingDemotionUsers />}
            />
          </Route>
          <Route Exact path="tags">
            <Route index element={<TagList />} />
            <Route path="add" element={<TagForm />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}
