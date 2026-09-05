import React from "react";

import {
  Link,
  Route,
  Routes
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GiftsPage from "./pages/GiftsPage";
import GiftDetailPage from "./pages/GiftDetailPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {

  return (
    <div>

      <nav className="navbar">

        <Link to="/" className="brand">
          GiftLink
        </Link>

        <div className="nav-links">

          <Link to="/gifts">
            Browse Gifts
          </Link>

          <Link to="/register">
            Register
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/gifts"
          element={<GiftsPage />}
        />

        <Route
          path="/gifts/:id"
          element={<GiftDetailPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

      </Routes>

    </div>
  );
}