// src/components/Header.tsx
import React from "react";
import { LogOut } from "lucide-react";

interface Props {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ userName, onLogout }) => {
  return (
    <div className="nav-bar">
      <h1>Weather</h1>
      <div className="user-info-area">
        {userName && <p className="user-name">Hi, {userName}</p>}
        <button onClick={onLogout} className="logout-button">
          <LogOut className="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
