// Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  ErrorText,
  LinkText,
  StyledLink,
} from "../component/styles";

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
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/weather");
    } catch (err: any) {
      setError(err.message);
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
        Don't have an account? <StyledLink as={Link} to="/signup">Sign Up</StyledLink>
      </LinkText>
    </Container>
  );
}

export default Login;
