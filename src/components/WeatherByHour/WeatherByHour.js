import React from 'react';
import './WeatherByHour.css';

class WeatherByHour extends React.Component {
    defineWeatherByHour() {
        const weatherForecastData = this.props.weatherForecastData;
        let weatherByHourData = [];
        for (let i = 1 ; i <= 9; i++) { // data for next 24 hour with 3 hour interval
            const data = {};
            data.hour = new Date(weatherForecastData[i].dt_txt).getHours();
            data.icon = weatherForecastData[i].weather[0].icon;
            data.temperature = Math.round(weatherForecastData[i].main.temp);
            data.description = weatherForecastData[i].weather[0].description;
            data.wind = weatherForecastData[i].wind.speed;
            weatherByHourData.push(data);
        }
        return weatherByHourData;
    }

    showWeatherByHour() {
        const weatherByHourData = this.defineWeatherByHour();
        let weatherByHourOutputData = [];
        weatherByHourData.forEach((data, index) => {
            weatherByHourOutputData.push(
                <tr key={index} className="weatherForecastTodayTableRow">
                    <td>{data.hour}:00</td>
                    <td>
                        <img
                            src={"http://openweathermap.org/img/wn/"+ data.icon +".png"}
                            alt="weather icon"
                        />
                    </td>
                    <td>{data.description}</td>
                    <td>{data.temperature} °C</td>
                    <td>{data.wind} km/h</td>
                </tr>
            );
        });
        return weatherByHourOutputData;
    }

    render() {
        return (
            <table className="weatherForecastTodayTable">
                <tbody>
                    {this.showWeatherByHour()}
                </tbody>
            </table>
        );
    }
}

export default WeatherByHour;