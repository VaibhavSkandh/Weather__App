import React from "react";
import { LogOut } from "lucide-react";
import { Nav_bar, User_info_area, User_name, Logout_button,Title} from "../styles/Header.module";

interface Props {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ userName, onLogout }) => {
  return (
    <Nav_bar>
      <Title>Weather</Title>
      <User_info_area>
        {userName && <User_name>Hi, {userName}</User_name>}
        <Logout_button onClick={onLogout}>
          <LogOut className="logout-icon" />
        </Logout_button>
      </User_info_area>
    </Nav_bar>
  );
};

export default Header;