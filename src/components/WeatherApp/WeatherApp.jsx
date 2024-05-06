import React, { useState } from 'react'
import './WeatherApp.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const WeatherApp = () => {

    // let api ="ec7bc542cba70632086298e30c03719b";
    let api ="dd94f859a0e52d6e4767fddf735f04a7";

    const [wicon,setwicon] = useState(cloud_icon);

    const search = async ()=>{
        const element = document.getElementsByClassName("city")
        if (element[0].value===""){
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api}`;
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity_percent");
        const wind = document.getElementsByClassName("wind_rate");
        const temprature = document.getElementsByClassName("weather_temp");
        const location = document.getElementsByClassName("weather_location");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km";
        temprature[0].innerHTML = Math.floor(data.main.temp)+" °c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setwicon(clear_icon);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setwicon(cloud_icon);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setwicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setwicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setwicon(rain_icon);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setwicon(rain_icon);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setwicon(snow_icon);
        }else{
            setwicon(clear_icon);
        }
    }

    return (

        <div className='parent'>
            <div className='container'>
                <div className='navbar'>
                    <input type='text' className='city' placeholder='search'/>
                    <div className='search_icon' onClick={()=>{search()}}>
                        <img src={search_icon} alt=''/>
                    </div>
                </div>
                <div className='weather_img'>
                    <img src={wicon} alt=''/>
                </div>
                <div className='weather_temp'>00</div>
                <div className='weather_location'>location</div>
                <div className='data_container'>
                    <div className='element'>
                        <img src={humidity_icon} className='icon' alt=''/>
                        <div className='data'>
                            <div className='humidity_percent'>0 %</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src = {wind_icon} className='icon' alt=''/>
                        <div className='data'>
                            <div className='wind_rate'> 0 Km/H</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp
