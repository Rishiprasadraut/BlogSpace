import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./component";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // FIX: Show a simple loader while checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking session...
      </div>
    );
  }

  // FIX: Return the actual app after loading
  return (
    <div className="min-h-screen flex flex-col bg-grey-400">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
