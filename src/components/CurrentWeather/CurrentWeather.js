import React from "react";
import "./CurrentWeather.css";

class CurrentWeather extends React.Component {
    defineCurrentWeatherData() {
        const data = Object.entries(this.props.weatherForecastData)[0][1];
        return {
            icon: data.weather[0].icon,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            weatherFeelsLike: Math.round(data.main.feels_like),
            windSpeed: data.wind.speed
        };
    }

    render() {
        const data = this.defineCurrentWeatherData();
        return (
            <div className="threeHourWeatherForecastContainer">
                <div className="currentWeatherContainer">
                    <div className="cityNameContainer">{this.props.selectedCity}</div>
                    <div>
                        <img
                            src={"http://openweathermap.org/img/wn/"+ data.icon +"@2x.png"}
                            alt="weather icon"
                        />
                    </div>
                    <div>
                        <h1>{data.temperature} °C</h1>
                    </div>
                    <div className="currentWeatherTable">
                        <div>{data.description}</div>
                        <div>feels like {data.weatherFeelsLike} °C</div>
                        <div>wind: {data.windSpeed} km/h</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;