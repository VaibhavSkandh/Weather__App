// src/components/Signup.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirect to dashboard on successful signup
    } catch (err: any) {
      setError(err.message);
      console.error("Error signing up with email:", err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/login"); // Redirect to dashboard on successful signup
    } catch (err: any) {
      setError(err.message);
      console.error("Error signing up with Google:", err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleEmailSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up with Email
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        style={{ ...styles.button, ...styles.googleButton }}
      >
        Sign Up with Google
      </button>

      {error && <p style={styles.errorText}>{error}</p>}

      <p style={styles.linkText}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  googleButton: {
    backgroundColor: "#dd4b39",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
  },
  linkText: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Signup;
