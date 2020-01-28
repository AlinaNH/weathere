import React from 'react';
import './FiveDayWeatherForecast.css';

class FiveDayWeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: null
        }
        this.sleep = this.sleep.bind(this);
        this.showFiveWeatherForecast = this.showFiveWeatherForecast.bind(this);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showFiveWeatherForecast() {  
        let timer = 0;
        this.state.components.forEach(async (component) => {
            await this.sleep(timer);
            setTimeout(() => {component.classList.add("slowDisplayNone")}, 500 + timer);  
            timer +=500;
            console.log(component)
        });
        this.state.components.forEach(async (component) => {
            await this.sleep(timer);
            setTimeout(() => {component.style.display = "none"}, 1000 + timer);
        });
    }

    componentDidMount() {
        this.setState({components: document.querySelectorAll(".container > *:not(.backgroundContainer)")});
    }
 
    render() {
        return (
            <>
                <div className="fiveDayWeatherForecastButton" onClick={this.showFiveWeatherForecast}>
                    <div className="fiveDayWeatherForecastLabel">5 day weather forecast</div>
                    <div><i className="fas fa-angle-double-right"></i></div>
                </div>
                <table class="fiveDayWeatherForecastTable">
                    sd
                </table>
            </>);
    }
}

export default FiveDayWeatherForecast;