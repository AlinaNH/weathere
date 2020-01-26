import React from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import CitySelection from './components/CitySelection/CitySelection';
import Background from './components/Background/Background';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      selectedCity: "Minsk"
    };
    this.getDataForSelectedCity = this.getDataForSelectedCity.bind(this);
  }

  handleInvalidCityInput() {
    document.getElementById("inputCity").classList.add("invalidInputCity");
    document.getElementById("errorMessageCity").style.display = "block";
  }

  getDataForSelectedCity(city) {
    this.getWeatherForecastData(city);
  }

  getWeatherForecastData(city) {
   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e9d7d03ef5105d96f8db4fb4a1f8c3e2&units=metric`)
      .then(
        response => response.json())
      .then(
        (result) => {
          if(result.cod === "404") {
            this.handleInvalidCityInput();
          } else {
            this.setState({
              isLoaded: true,
              result,
              selectedCity: city
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
  }

  componentDidMount() {
    this.getWeatherForecastData(this.state.selectedCity);
  }

  render() {
    const { error, isLoaded, result } = this.state;
    let output;
    if(error) {
      output = <div className="notLoaded">Data is not available now. Please, try later.</div>;
    } else if(!isLoaded) {
      output = <div className="notLoaded"><i className="fa fa-cog fa-spin"></i></div>;
    } else {
      output = (
        <>
          <Background />
          <CitySelection onCitySubmit={this.getDataForSelectedCity} />
          <CurrentWeather weatherForecastData={result.list} selectedCity={this.state.selectedCity} />
        </>
      );
    }
    return (
      <div className="container">{output}</div>
    );
  }
}

export default App;