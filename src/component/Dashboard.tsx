// Dashboard.tsx
import React from "react";
import { useAuth } from "../component/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Button,
  ProfilePic,
  StyledLink,
} from "../component/styles";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      // Use an explicit error type to ensure type safety
      if (err instanceof Error) {
        console.error("Error logging out:", err.message);
      } else {
        console.error("An unknown error occurred during logout.");
      }
    }
  };

  return (
    <Container>
      <h2>Welcome to your Dashboard!</h2>
      {currentUser ? (
        <div>
          <p>Logged in as: {currentUser.email}</p>
          {currentUser.displayName && <p>Name: {currentUser.displayName}</p>}
          {currentUser.photoURL && (
            <ProfilePic src={currentUser.photoURL} alt="Profile" />
          )}
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <p>
          You are not logged in. Please <StyledLink to="/login">login</StyledLink>.
        </p>
      )}
    </Container>
  );
}

export default Dashboard;