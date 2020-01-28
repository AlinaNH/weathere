import React from "react";
import './CurrentWeather.css';
import FiveDayWeatherForecast from './../FiveDayWeatherForecast/FiveDayWeatherForecast';
import WeatherByHour from './../WeatherByHour/WeatherByHour';

class CurrentWeather extends React.Component {
    defineCurrentWeatherData() {
        const currentWeatherData = Object.entries(this.props.weatherForecastData)[0][1];
        
        const icon = currentWeatherData.weather[0].icon;
        const temperature = Math.round(currentWeatherData.main.temp);
        const weatherDescription = currentWeatherData.weather[0].description;
        const weatherFeelsLike = Math.round(currentWeatherData.main.feels_like);
        const windSpeed = currentWeatherData.wind.speed;

        return {
            icon,
            temperature,
            weatherDescription,
            weatherFeelsLike,
            windSpeed
        };
    }

    render() {
        const currentWeatherData = this.defineCurrentWeatherData();
   
        return (
            <>
                <div className="weatherForecastNowContainer">
                    <div className="cityNameContainer">{this.props.selectedCity}</div>
                    <div>
                        <img
                            src={"http://openweathermap.org/img/wn/"+ currentWeatherData.icon +"@2x.png"}
                            alt="weather icon"
                        />
                    </div>
                    <div>
                        <h1>{currentWeatherData.temperature} °C</h1>
                    </div>
                    <div className="weatherForecastNowTable">
                        <div>{currentWeatherData.weatherDescription}</div>
                        <div>feels like {currentWeatherData.weatherFeelsLike} °C</div>
                        <div>wind: {currentWeatherData.windSpeed} km/h</div>
                    </div>
                </div>
                <FiveDayWeatherForecast weatherForecastData={this.props.weatherForecastData}/>
                <WeatherByHour weatherForecastData={this.props.weatherForecastData} />
            </>
        );
    }
}

export default CurrentWeather;