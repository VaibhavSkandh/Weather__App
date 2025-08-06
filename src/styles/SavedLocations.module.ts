// SavedLocations.module.ts
import styled from "styled-components";

export const Saved_location_list = styled.div`
  margin-top: 20px;
  color: white;
`;

export const Saved_header = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ffffff4d;
  padding-bottom: 10px;
`;

export const Saved_item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff1a;
  border-radius: 1rem;
  margin-bottom: 10px;
  border: 1px solid #ffffff4d;
  height:71px;
`;

export const Saved_location_card = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Saved_icon = styled.div`
  font-size: 24px;
`;

export const Saved_temp = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

export const Saved_city = styled.p`
  font-size: 16px;
`;

export const Saved_country = styled.p`
  opacity: 0.8;
`;

export const Delete_saved_button = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
`;

export default { Saved_location_list, Saved_header, Saved_item, Saved_location_card, Saved_icon, Saved_temp, Saved_city, Saved_country, Delete_saved_button };