import axios, { formToJSON } from 'axios';
import React from 'react';
import { useState, useEffect } from 'react'

const Weather = () => {


const [isweather, setIsWeather] = useState([]);

useEffect(() => {


    if('geolocation' in navigator){

        console.log('geolocation available')
    
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log(lat, lon);


            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8b5fb68fdc148d5c789bfda264214869&units=metric`)
                .then(response => setIsWeather(response.data))
        });

    
    }else{
        console.log('geolocation not available')
    }
    
    
},[]);


console.log(isweather);


const inCelsius = isweather.main?.temp;
const inFahrenheit = Math.round((inCelsius*1.82) + 32);

const [ismetric, setIsMetric] = useState(true);

const changetemperature = () => {
    setIsMetric(!ismetric);
}




    return (
        <div className='container'>

            <h2 className="card-title">Weather app</h2>

            <div className="card-content">
                   

                <div className="card-content--info">
                    <h2 className="card-subtitle">{isweather.name}, {isweather.sys?.country}</h2>
                    <h2 className="card-subtitle">Wind speed: {isweather.wind?.speed} m/s</h2>
                    <h2 className="card-subtitle">Clouds: {isweather.clouds?.all}%</h2>
                    <h2 className="card-subtitle">Pressure: {isweather.main?.pressure} mb</h2>
                </div>

                <div className="card-content--img">
                <h2 className="card-subtitle">"{isweather.weather?.[0]?.description}" </h2>

                    <img src={`http://openweathermap.org/img/wn/${isweather.weather?.[0].icon}.png`} alt="weather-icon" className="card-img" />
                    <h2 className="card-subtitle--degrees">
                       {ismetric ? inCelsius : inFahrenheit}
                       {' '}
                       {ismetric ? '°C' : '°F'}
                    </h2>
                </div>
                
            </div>
            <button className="card-btn" onClick={changetemperature}>Degrees °F/°C</button>
        </div>
    );
};

export default Weather;