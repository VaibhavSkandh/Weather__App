// Header.module.ts
import styled from "styled-components";

export const Nav_bar = styled.div`
  background-color: #0000004d;
  position: absolute;
  margin: 21px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ffffff4d;
  border-radius: 2rem;
  padding: 3rem;
  width: 97%;
  height: 20px;
  align-items: center;
  color: white;
`;

export const User_info_area = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const User_name = styled.p`
  margin-right: 1rem;
`;

export const Logout_button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;
export const Title=styled.h1`
    font-weight:1000;
    font-family: Poppins, sans-serif;
    font-size:2rem;
  `

export default { Nav_bar, User_info_area, User_name, Logout_button,Title};