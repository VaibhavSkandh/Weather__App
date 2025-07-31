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
  .logout-button{
    height:37px;
    width:37px;
    background-color:white;
    position:relative;
    left:87%;
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
  
   }
   .forecast-title{
   display:block;
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
`;