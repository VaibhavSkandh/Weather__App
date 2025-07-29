import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../src/component/AuthContext";
import Signup from "../src/component/Signup";
import Login from "../src/component/Login";
import Dashboard from "../src/component/Dashboard";
import DisplayWeather from "../src/component/DisplayWeather";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={styles.loading}>Loading user session...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div style={styles.loading}>Initializing application...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/weather" element={<DisplayWeather />} />
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/weather" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="*"
            element={
              <h1 style={{ marginTop: "100px" }}>404 - Page Not Found</h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontSize: "24px",
    color: "#555",
  },
};

export default App;
