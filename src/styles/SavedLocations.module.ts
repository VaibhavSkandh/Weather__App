// SavedLocations.module.ts
import styled from "styled-components";

export const SavedLocationList = styled.div`
  margin-top: 20px;
  color: white;
`;

export const SavedHeader = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ffffff4d;
  padding-bottom: 10px;
`;

export const SavedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff1a;
  border-radius: 1rem;
  margin-bottom: 10px;
  border: 1px solid #ffffff4d;
  height:71px;
`;

export const SavedLocationCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const SavedIcon = styled.div`
  font-size: 24px;
`;

export const SavedTemp = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

export const SavedCity = styled.p`
  font-size: 16px;
`;

export const SavedCountry = styled.p`
  opacity: 0.8;
`;

export const DeleteSavedButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
`;

const SavedLocationsModuleStyles = { 
  SavedLocationList, 
  SavedHeader, 
  SavedItem, 
  SavedLocationCard, 
  SavedIcon, 
  SavedTemp, 
  SavedCity, 
  SavedCountry, 
  DeleteSavedButton 
};

export default SavedLocationsModuleStyles;