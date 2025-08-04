import styled from "styled-components";
export const FC_Section = styled.div`
    color:white
    font-weight:100;
    font-family:Poppins, sans-serif;
`;

export const FC_Title = styled.h2`
  display:block;
  margin:20px 0px;
  color:white;
`
export const Hourly_list = styled.div`
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-padding: 0;
    scrollbar-width: none;
    width: 100%;
    height:7rem;
`
export const Hourly_item = styled.div`
  color:white;   
    margin:20px;
    flex: 0 0 100px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 15px 5px;
    text-align: center;
    display: flex;
    height:75px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`
export const Hourly_time =styled.p`
  font-size: 14px;
  opacity: 0.8;
`
export const Hourly_temp = styled.p`
  font-size: 18px;
  font-weight: bold;
`
export const Daily_forecast_list = styled.div`
   display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-padding: 0;
    scrollbar-width: none;
    width: 100%;
    height:7rem;
`
export const Daily_item = styled.div`
    color:white;   
    flex: 0 0 100px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 15px 5px;
    text-align: center;
    display: flex;
    height:75px;
    margin:15px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`
export default {FC_Section,FC_Title,Hourly_item,Hourly_time,Hourly_list,Daily_forecast_list,Daily_item,Hourly_temp}