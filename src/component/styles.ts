// styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// -------------------------------------------------------------
// Component-specific styles
// -------------------------------------------------------------

// Main Layout
export const AppContainer = styled.div`
  /* Styles for the main app container */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
`;

export const MainArea = styled.div`
  display: grid;
  grid-gap: 20px;
  backdrop-filter: blur(3px);
  background: #0000004d;
  border-radius: 3rem;
  box-shadow: 0 8px 20px #0000001a;
  display: flex;
  margin: 1rem;
  padding: 40px;
  position: absolute;
  top: 20%;
  width: 90vw; /* Replaced 'vb' with 'vw' */
`;

// Search Section
export const SearchArea = styled.div`
  background-color: #0000001a;
  border: 1px solid #ffffff4d;
  border-radius: 2rem;
  box-shadow: 0 10px 15px #0000001a;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10%;
  padding: 20px 30px;
  transition: all 0.3s ease;
  width: 25%;
`;

export const SearchInput = styled.input`
  height: 4rem;
  padding-left: 5rem;
  border-radius: 30px;
  background-color: #0000004d;
  border: none;
  color: black;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    opacity: 1;
  }
`;

export const SearchDropdown = styled.ul`
  max-height: 100px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 9px;
  border: 1px solid #555;
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: absolute;
  width: 62%;
  z-index: 10;
`;

// Right-hand content section
export const RightSection = styled.div`
  background-color: #0000001a;
  border: 1px solid #ffffff4d;
  border-radius: 2rem;
  box-shadow: 0 10px 15px #0000001a;
  padding: 3rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 68%;
`;

// Current Weather Details
export const CurrentWeather = styled.div`
  border-bottom: 1px solid grey;
  height: 40vh;
  width: auto;
`;

export const CityName = styled.h2`
  color: white;
  font-size: 50px;
  font-weight: 100;
`;

export const CountryName = styled.p`
  color: white;
`;

export const ConditionText = styled.p`
  color: #fff9;
`;

export const WeatherIconDisplay = styled.div`
  color: white;
`;

export const OtherInfo = styled.div`
  color: white;
  position: absolute;
  right: 7.5%;
  top: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: right;
`;

export const SunTimeSection = styled.div`
  color: white;
  letter-spacing: 0.6px;
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  overflow-y: auto;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-content: space-around;
  align-items: baseline;
`;

export const SaveButton = styled.button`
  position: relative;
  top: 10%;
  left: 94%;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background-color: transparent;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background-color: rgba(245, 239, 239, 1);
    opacity: 0.5;
    box-shadow: 0 5px 15px rgba(162, 155, 155, 0.18);
  }
`;

// Re-usable base components
export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

export const Button = styled.button<{ variant?: "google" | "danger" }>`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  background-color: ${({ variant }) =>
    variant === "google"
      ? "#dd4b39"
      : variant === "danger"
      ? "#dc3545"
      : "#007bff"};

  &:hover {
    opacity: 0.9;
  }
`;

export const LinkText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

export const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

export const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px 0;
  object-fit: cover;
`;

// Global styles (optional, but good for base resets)
// Can be used in a separate 'globalStyles.ts' file and imported.
export const GlobalStyles = styled.div`
  /* A simple reset without the global selector */
  &, * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;