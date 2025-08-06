// SearchBar.module.ts
import styled from "styled-components";

export const Search_input_wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Search_input = styled.input`
  width: 86%;
  padding: 10px 15px;
  border-radius: 1rem;
  border: none;
  background-color: #ffffff4d;
  color: white;
  font-size: 16px;
`;

export const Search_dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  list-style: none;
  background: #ffffffcc;
  border-radius: 1rem;
  margin-top: 5px;
  padding: 10px 0;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Suggestion_item = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Suggestion_icon = styled.div`
  color: #666;
`;

export default { Search_input_wrapper, Search_input, Search_dropdown, Suggestion_item, Suggestion_icon };