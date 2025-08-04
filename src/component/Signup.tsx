// Signup.tsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  AuthError,
} from "firebase/auth";
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
      navigate("/login");
    } catch (err: unknown) {
      if (isAuthError(err)) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/login");
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
      <h2>Create an Account</h2>
      <Form onSubmit={handleEmailSignup}>
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
        <Button type="submit">Sign Up with Email</Button>
      </Form>

      <Button variant="google" onClick={handleGoogleSignup}>
        Sign Up with Google
      </Button>

      {error && <ErrorText>{error}</ErrorText>}
      <LinkText>
        Already have an account? <StyledLink to="/login">Login</StyledLink>
      </LinkText>
    </Container>
  );
}

export default Signup;
