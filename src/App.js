import React from "react";
import "./App.css";
import { FiLoader } from "react-icons/fi";
import Background from "./components/Background/Background";
import CitySelection from "./components/CitySelection/CitySelection";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherByHour from "./components/WeatherByHour/WeatherByHour";
import FiveDayWeatherForecast from "./components/FiveDayWeatherForecast/FiveDayWeatherForecast";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: [],
            city: null
        };
        this.getWeatherForecastData = this.getWeatherForecastData.bind(this);
        this.getDataForSelectedCity = this.getDataForSelectedCity.bind(this);
    }

    getDataForSelectedCity(city) {
        this.getWeatherForecastData(city);
    }

    getWeatherForecastData(city) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude.toFixed(2),
                      lon = position.coords.longitude.toFixed(2);
                let api;

                !city
                    ? api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e9d7d03ef5105d96f8db4fb4a1f8c3e2&units=metric`
                    : api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e9d7d03ef5105d96f8db4fb4a1f8c3e2&units=metric`;

                fetch(api)
                    .then(
                        response => response.json())
                    .then(
                        (result) => {
                            if(result.cod === "404") {
                                document.querySelector(".inputCity").classList.add("invalidInputCity");
                                document.querySelector(".errorMessageCity").style.display = "block";
                            } else {
                                this.setState({
                                    isLoaded: true,
                                    result: result.list,
                                    city: result.city.name
                                });
                            }
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    );
            });
        }
    }

    componentDidMount() {
        this.getWeatherForecastData();
    }

    render() {
        const { error, isLoaded, result } = this.state;
        let output;
        if(error) {
            output = <div className="notLoaded">Data is not available now. Please, try later.</div>;
        } else if(!isLoaded) {
            output = <div className="notLoaded"><FiLoader /></div>;
        } else {
            output = (
                <>
                    <Background />
                    <CitySelection onCitySubmit={this.getDataForSelectedCity} />
                    <CurrentWeather weatherForecastData={result} selectedCity={this.state.city} />
                    <FiveDayWeatherForecast weatherForecastData={result} />
                    <WeatherByHour weatherForecastData={result} />
                </>
            );
        }
        return (
            <div className="container">{output}</div>
        );
    }
}

export default App;