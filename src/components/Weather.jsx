import axios, { formToJSON } from 'axios';
import React from 'react';
import { useState, useEffect } from 'react'

const Weather = () => {


const [isweather, setIsWeather] = useState([]);

useEffect(() => {
    
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8b5fb68fdc148d5c789bfda264214869&units=metric')
        .then(response => setIsWeather(response.data))
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
            <div className="card-content">
                   

                <div className="card-content--info">
                    <h1 className="card-title">Weather app</h1>
                    <h2 className="card-subtitle">{isweather.name}</h2>
                    <h2 className="card-subtitle">Wind speed: {isweather.wind?.speed} m/s</h2>
                    <h2 className="card-subtitle">Clouds: {isweather.clouds?.all}%</h2>
                    <h2 className="card-subtitle">Pressure: {isweather.main?.pressure}</h2>
                </div>

                <div className="card-content--img">
                <h2 className="card-subtitle">{isweather.weather?.[0]?.description} </h2>

                    <img src={isweather.weather?.main} alt="" className="card-img" />
                    <h2 className="card-subtitle--degrees">
                       {ismetric ? inCelsius : inFahrenheit}
                       {' '}
                       {ismetric ? '°C' : '°F'}
                    </h2>
                </div>
                
                <button className="card-btn" onClick={changetemperature}>Degrees °F/°C</button>
                
            </div>
            
        </div>
    );
};

export default Weather;