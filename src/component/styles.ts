import styled from 'styled-components';

export const MainWrapper = styled.div`
*{
  margin:0px;
  padding:0px;
  box-sizing:
  }
  .app-container{
    
  }
    .main-area{
    grid-gap: 20px;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    background: #0000004d;
    border-radius: 3rem;
    box-shadow: 0 8px 20px #0000001a;
    display: flex;
    margin: 1rem;
    padding: 40px;
    position:absolute;
    top:20%;
    width:202vb;
    }
  .nav-bar{
    background-color: #0000004d;
    position:absolute;
    margin:21px;
    display:flex;
    flex-direction:row;
    border: 1px solid #ffffff4d;
    border-radius: 2rem;
    padding: 3rem;
    transition: transform .3s ease, box-shadow .3s ease;
    width:91%;
    height:20px;
    align-items:center;
    color:white;
  } 
  .nav-bar h1{
  font-weight:1000;
  font-family: Poppins, sans-serif;
  font-size:2rem;

   }
  .user-info-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position:absolute;
  right:3%;
  padding: 0.4rem 1rem;
}

.user-name {
  color: white;
  font-weight: 500;
}

  .logout-button{
    height:37px;
    width:37px;
    background-color:white;
    position:relative;
    border:none;
    border-radius:30px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      background-color:rgba(245, 239, 239, 1);;
      opacity:0.5;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    }
    
  .search-area{
    background-color: #0000001a;
    border: 1px solid #ffffff4d;
    border-radius: 2rem;
    box-shadow: 0 10px 15px #0000001a;
    display: flex;
    flex-direction: column;
    position:relative;
    top:10%;
    padding: 20px 30px;
    transition: all .3s ease;
    width: 25%;
  }
    .search-input{
      height:4rem;
      padding-left:5rem;
      border-radius:30px;
      background-color:#0000004d;
      border:none;
      color:black;
      font-size: 16px;
      }
    .search-input::placeholder {
        color: rgba(255, 255, 255, 0.7); 
        opacity: 1;
}
    .right-section{    
    background-color: #0000001a;
    border: 1px solid #ffffff4d;
    border-radius: 2rem;
    box-shadow: 0 10px 15px #0000001a;
    padding: 3rem;
    transition: transform .3s ease, box-shadow .3s ease;
    width: 61%;
    }
   .current-weather{
     border-bottom: 1px solid grey;
      height:40vh;
      width:auto;
   } 
   .city-name{
     color:white;
     font-size:50px;
     font-weight:100;
   }
    .country-name{
     color:white;
     }
     .condition-text{
     color:#fff9;
     }
     .weather-icon-display{
      color:white
      }
      .other-info{    color: white;
    position: absolute;
    right: 7.5%;
    top: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: right;
}}
   .sun-time-section{
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
   }
    .save-button{
        position:relative;
        top:10%;
        left:94%;
        height:30px;
        width:30px;
        border-radius:30px;
        background-color:transparent;
        border:none;
         transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      background-color:rgba(245, 239, 239, 1);
      opacity:0.5;
      box-shadow: 0 5px 15px rgba(162, 155, 155, 0.18);
    }
        }
   .forecast-section{
  color:white
  font-weight:100;
  font-family:Poppins, sans-serif;
   }
   .forecast-title{
   display:block;
   margin:20px 0px;
   color:white;
   }
   .hourly-forecast-list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-padding: 0;
    scrollbar-width: none;
    width: 100%;
    }
    .hourly-item{ 
    color:white;   
    margin:15px;
    flex: 0 0 100px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 15px 5px;
    text-align: center;
    display: flex;
    height:60px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
}
    .daily-forecast-list{
     display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-padding: 0;
    scrollbar-width: none;
    width: 100%;
    }
    .daily-item{
    color:white;   
    flex: 0 0 100px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 15px 5px;
    text-align: center;
    display: flex;
    height:60px;
    margin:10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);}}
.saved-location-list {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
}

.saved-header {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.saved-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
}

.saved-location-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
}

.delete-saved-button {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
}
  .saved-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.6rem 1rem;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  backdrop-filter: blur(4px);
  cursor: pointer;
}

.saved-location-card {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.saved-icon {
  font-size: 1.2rem;
}

.saved-temp {
  font-weight: bold;
  font-size: 1rem;
}

.saved-city {
  font-weight: 500;
}

.saved-country {
  font-size: 0.85rem;
  opacity: 0.8;
}

.delete-saved-button {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
}



      
`;