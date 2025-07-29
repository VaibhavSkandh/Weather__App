import React from "react";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err: any) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to your Dashboard!</h2>
      {currentUser ? (
        <div>
          <p>Logged in as: {currentUser.email}</p>
          {currentUser.displayName && <p>Name: {currentUser.displayName}</p>}
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              style={styles.profilePic}
            />
          )}
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <p>
          You are not logged in. Please{" "}
          <Link to="" style={styles.link}>
            login
          </Link>
          .
        </p>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginTop: "15px",
    marginBottom: "15px",
    objectFit: "cover",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Dashboard;
