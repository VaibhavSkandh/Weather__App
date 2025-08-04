// Signup.tsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
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
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
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
        Already have an account?{" "}
        <StyledLink as={Link} to="/login">
          Login
        </StyledLink>
      </LinkText>
    </Container>
  );
}

export default Signup;
