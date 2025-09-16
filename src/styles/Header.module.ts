// Header.module.ts
import styled from "styled-components";

export const NavBar = styled.div`
 background-color: #0000004d;
    position: absolute;
    margin: 21px;
    display: flex;
    flex-direction: row;
    border: 1px solid #ffffff4d;
    border-radius: 2rem;
    padding: 3rem;
    width: 90%;
    height: 20px;
    align-items: center;
    color: white;
    top: 0px;
`;

export const UserInfoArea = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const UserName = styled.p`
  margin-right: 1rem;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;

export const Title = styled.h1`
    font-weight:1000;
    font-family: Poppins, sans-serif;
    font-size:2rem;
`;

const HeaderModuleStyles = { NavBar, UserInfoArea, UserName, LogoutButton, Title };

export default HeaderModuleStyles;