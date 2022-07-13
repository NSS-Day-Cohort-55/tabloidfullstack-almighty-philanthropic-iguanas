import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import firebase from "firebase/app";
import { getUserByFireBaseId } from "./modules/userProfileManager.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [user, setUser] = useState();

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    console.log("im running");
    if (firebase.auth().currentUser) {
      getUserByFireBaseId(firebase.auth().currentUser.uid).then((user) => {
        setUser(user);
      });
    }
    console.log(firebase.auth().currentUser?.uid);
  }, [setIsLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userType={user?.userType.name} />
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  );
}

export default App;
