import React from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: []
    };
  }

  getWeatherForecastData() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=e9d7d03ef5105d96f8db4fb4a1f8c3e2&units=metric")
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result
          });
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
    this.getWeatherForecastData();
  }

  render() {
    const { error, isLoaded, result } = this.state;
    let output;
    if(error) {
      output = <div className="notLoaded">Data is not available now. Please, try later.</div>;
    } else if(!isLoaded) {
      output = <div className="notLoaded"><i className="fa fa-cog fa-spin"></i></div>;
    } else {
      output = <CurrentWeather weatherForecastData={result.list} />;
    }
    return (
      <div className="container">{output}</div>
    );
  }
}

export default App;