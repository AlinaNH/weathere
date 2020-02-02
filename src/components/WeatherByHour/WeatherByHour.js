import React from "react";
import "./WeatherByHour.css";

class WeatherByHour extends React.Component {
    defineWeatherByHour() {
        const data = this.props.weatherForecastData;
        let weatherByHourData = [];
        for (let i = 1 ; i <= 9; i++) { // data for next 24 hour with 3 hour interval
            const sortedData = {};

            sortedData.hour = new Date(data[i].dt_txt).getHours();
            sortedData.icon = data[i].weather[0].icon;
            sortedData.temperature = Math.round(data[i].main.temp);
            sortedData.description = data[i].weather[0].description;
            sortedData.wind = data[i].wind.speed;

            weatherByHourData.push(sortedData);
        }
        return weatherByHourData;
    }

    showWeatherByHour() {
        const weatherByHourData = this.defineWeatherByHour();
        let weatherByHourOutputData = [];
        weatherByHourData.forEach((data, index) => {
            weatherByHourOutputData.push(
                <tr key={index} className="weatherByHourTableRow">
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
            <div className="threeHourWeatherForecastContainer">
                <table className="weatherByHourTable">
                    <tbody>
                        {this.showWeatherByHour()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default WeatherByHour;