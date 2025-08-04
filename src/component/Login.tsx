// Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, AuthError } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  ErrorText,
  LinkText,
  StyledLink,
} from "../component/styles";

// A simple type guard to check for Firebase Auth errors
const isAuthError = (err: unknown): err is AuthError => {
  return typeof err === 'object' && err !== null && 'code' in err && typeof (err as { code: string }).code === 'string';
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/weather");
    } catch (err: unknown) {
      if (isAuthError(err)) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/weather");
    } catch (err: unknown) {
      if (isAuthError(err)) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    }
  };

  return (
    <Container>
      <h2>Login to Your Account</h2>
      <Form onSubmit={handleEmailLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login with Email</Button>
      </Form>
      <Button variant="google" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      <LinkText>
        Don't have an account? <StyledLink to="/signup">Sign Up</StyledLink>
      </LinkText>
    </Container>
  );
}

export default Login;
