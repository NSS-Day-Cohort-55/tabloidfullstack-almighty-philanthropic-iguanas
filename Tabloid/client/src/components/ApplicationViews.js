import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserProfileIndex from "./UserProfileComponents/UserProfileIndex";
import DeactivatedUsers from "./UserProfileComponents/DeactivatedUsers";
import PendingDemotionUsers from "./UserProfileComponents/PendingDemotionUsers";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userProfiles">
            <Route index element={<UserProfileIndex/>}/>
            <Route path="deactivatedUsers" element={<DeactivatedUsers/>}/>
            <Route path="pendingDemotionUsers" element={<PendingDemotionUsers/>}/>
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
