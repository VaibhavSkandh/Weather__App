// src/hooks/useAuthStatus.tsx
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthStatus {
  userName: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const useAuthStatus = (): AuthStatus => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      const name = user?.displayName || user?.email?.split("@")[0];
      setUserName(name ?? "User");
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { userName, loading, logout: handleLogout };
};

export default useAuthStatus;