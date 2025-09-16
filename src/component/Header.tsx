import React from "react";
import { LogOut } from "lucide-react";
import { NavBar, UserInfoArea, UserName, LogoutButton, Title } from "../styles/Header.module";

interface Props {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ userName, onLogout }) => {
  return (
    <NavBar>
      <Title>Weather</Title>
      <UserInfoArea>
        {userName && <UserName>Hi, {userName}</UserName>}
        <LogoutButton onClick={onLogout}>
          <LogOut className="logout-icon" />
        </LogoutButton>
      </UserInfoArea>
    </NavBar>
  );
};

export default Header;