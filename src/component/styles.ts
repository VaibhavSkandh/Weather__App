import styled from "styled-components";

export const MainWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #c7c7eb, #ccf2dd);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem; 

  .app-container {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 2rem;
    width: auto; 
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    font-family: 'Inter', sans-serif;
  }

  .search-area{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    
  }

  .search-area input {
    width: 30%;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid #aaa;
    text-align: center;
    position: relative;
    right: -32%;
    outline: none;
    font-size: 1rem; 
    color: #333;
    &::placeholder {
      color: #999;
    }
    &:focus {
      border-color: #6a5acd; 
      box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2); 
    }
  }

  .icon-search {
  height: 24px;
  width: 24px;
    border-radius: 50px;
    position: absolute;
    left: 60%;
    top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background: #ddd; 
    }
  }

  .current-weather {
    text-align: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 1.5rem;
  }

  .weather-icon-display {
    font-size: 5rem;
    margin: -2rem 0; 
  }

  .humidityLevel,
  .wind {
    display: flex;
    align-items: center;
    gap: 0.5rem; 
  }

  .windIcon {
    font-size: 2rem;
    color: #007bff; 
  }

  .humidity-info{
    text-align: center;
  }

  .loading-message,{
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .loading-text{
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1rem;
  }
    .daily-forecast-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    boreder: 1px solid #ddd;
    }
    .daily-item{
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background 0.3s ease;
    &:hover {
      background: #ddd; 
    }
}
    .hourly-forecast-list{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    }
    .hourly-item{
    background: #fff;
    border-radius: 8px;
    height:30px
    width: 80px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background 0.3s ease;
    &:hover {
      background: #ddd; 
    }
}
.save-location-area {
    margin-top: 20px;
    text-align: center;
    padding-top: 15px; /* Added some padding for separation */
    border-top: 1px solid #eee; /* Optional: A subtle line to separate sections */

    .save-button {
      background-color: #4CAF50; /* Green */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.3s ease;

      &:hover:not(:disabled) {
        background-color: #45a049;
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.7;
      }

      .icon-save {
        width: 20px;
        height: 20px;
      }
    }

    .save-status-message {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
      font-style: italic;
    }
  }
    style={{
                marginLeft: "10px",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
