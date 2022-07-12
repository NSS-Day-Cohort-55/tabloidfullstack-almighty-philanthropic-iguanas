import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserProfileIndex from "./UserProfileComponents/UserProfileIndex";
import DeactivatedUsers from "./UserProfileComponents/DeactivatedUsers";
import PendingDemotionUsers from "./UserProfileComponents/PendingDemotionUsers";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagFrom";
import Posts from "./Posts";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="posts" element={<Posts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userProfiles">
            <Route index element={<UserProfileIndex/>}/>
            <Route path="deactivatedUsers" element={<DeactivatedUsers/>}/>
            <Route path="pendingDemotionUsers" element={<PendingDemotionUsers/>}/>
          </Route>
          <Route Exact path="tags">
              <Route index element={<TagList />} />
              <Route path="add" element={<TagForm />} />
          </Route> cd
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
