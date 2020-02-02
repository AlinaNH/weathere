import React from 'react';
import './FiveDayWeatherForecast.css';
import moment from 'moment';

class FiveDayWeatherForecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: null,
            fiveDayWeatherForecastData: null
        }
        this.sleep = this.sleep.bind(this);
        this.showFiveWeatherForecastPage = this.showFiveWeatherForecastPage.bind(this);
        this.showFiveWeatherForecast = this.showFiveWeatherForecast.bind(this);
        this.defineFiveDayWeatherForecastData = this.defineFiveDayWeatherForecastData.bind(this);
        this.sortWeatherForecastDataForRows = this.sortWeatherForecastDataForRows.bind(this);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showFiveWeatherForecastPage(action) {
        if (!action) {
            this.state.components.forEach((component) => component.style.display = "none");
            document.getElementsByClassName("containerTable")[0].style.display = "flex";
            document.getElementsByClassName("currentWeatherForecastButton")[0].style.display = "flex";
        } else {
            this.state.components.forEach((component) => component.style.display = "");
            document.getElementsByClassName("containerTable")[0].style.display = "none";
            document.getElementsByClassName("currentWeatherForecastButton")[0].style.display = "none";
        }
        // if (action) {
        //     let timer = 0;
        //     this.state.components.forEach(async (component) => {
        //         await this.sleep(timer);
        //         setTimeout(() => {component.classList.add("slowDisplayNone")}, 500 + timer);  
        //         timer +=500;
        //         await this.sleep(timer);
        //         if(timer === 3000) {
        //             timer +=500;
        //             await this.sleep(timer);
        //             this.state.components.forEach((component) => component.style.display = "none");
        //             document.getElementsByClassName("containerTable")[0].classList.remove("slowDisplayNone");
        //             document.getElementsByClassName("containerTable")[0].style.display = "flex";
        //             document.getElementsByClassName("currentWeatherForecastButton")[0].classList.remove("slowDisplayNone");
        //             document.getElementsByClassName("currentWeatherForecastButton")[0].style.display = "flex";
        //         }
        //     });
        // }
    }

    componentDidMount() {
        this.setState({
            components: document.querySelectorAll(".container > *:not(.backgroundContainer)"),
            fiveDayWeatherForecastData: this.defineFiveDayWeatherForecastData()
        });
    }

    defineFiveDayWeatherForecastData() {
        const todayDate = new Date().getDate();
        const fiveDayWeatherForecastData = [];
        this.props.weatherForecastData.forEach((data) => {
            if (new Date(data.dt_txt).getDate() !== todayDate) {
                fiveDayWeatherForecastData.push(data);
            }
        });
        return fiveDayWeatherForecastData;
    }
    
    sortWeatherForecastDataForRows() {
        const weatherForecastDataForRows = [];

        let nextDay = moment().add(1, 'days').format('DD.MM.YYYY').slice(0, 5);
        let rowData = {};
        let dataByHour = [];
        const data = this.state.fiveDayWeatherForecastData;

        for(let i = 0; i < data.length; i++) {
            const date = moment(new Date(data[i].dt_txt)).format('DD.MM.YYYY').slice(0, 5);
            if(date === nextDay) {
                rowData.day = moment(new Date(data[i].dt_txt)).format("ddd");
                rowData.date = date;
                dataByHour.push({
                    hour: moment(new Date(data[i].dt_txt)).format('HH:mm'),
                    icon: data[i].weather[0].icon,
                    temperature: Math.round(data[i].main.temp),
                    wind: data[i].wind.speed
                })
                rowData.dataByHour = dataByHour;
            } else if (date !== nextDay){
                weatherForecastDataForRows.push(rowData);
                dataByHour = [];
                rowData = {};
                nextDay = date;
                rowData.date = date;
                i--;
            }
            if (i === data.length - 1) {
                weatherForecastDataForRows.push(rowData);
            }
        }
        return weatherForecastDataForRows;
    }

    showFiveWeatherForecast() {
        let data = [];
        let fiveDayWeatherOutputData = [];
        if(this.state.fiveDayWeatherForecastData) data = this.sortWeatherForecastDataForRows();
        data.forEach((data, index) => {
            const dataByHour = [];
            data.dataByHour.forEach((data, index) => {
                dataByHour.push(
                    <td key={index}>
                        <span>{data.hour}</span>
                        <span><img
                            src={"http://openweathermap.org/img/wn/"+ data.icon +".png"}
                            alt="weather icon"
                        /></span>
                        <span className="boldTd">{data.temperature} °C</span>
                        <span>{data.wind} km/h</span>
                    </td>
                );
            });
            while(dataByHour.length <= 7) {
                dataByHour.push(<td key={dataByHour.length}></td>);
            }
            fiveDayWeatherOutputData.push(
                <tr key={index} className="fiveDayWeatherForecastTableRow">
                    <td className="boldTd">{data.day}</td>
                    <td className="boldTd">{data.date}</td>
                    <>{dataByHour}</>
                </tr>
            );
        });
        return fiveDayWeatherOutputData;
    }
 
    render() {
        return (
            <>
                <div className="fiveDayWeatherForecastButton" onClick={() => this.showFiveWeatherForecastPage(false)}>
                    <div className="fiveDayWeatherForecastLabel">5 day weather forecast</div>
                    <div><i className="fas fa-angle-double-right"></i></div>
                </div>
                <div className="currentWeatherForecastButton" onClick={() => this.showFiveWeatherForecastPage(true)}>
                    <div><i className="fas fa-angle-double-left"></i></div>
                        <div className="fiveDayWeatherForecastLabel">back to today forcast</div>
                </div>
                <div className="containerTable">
                    <table className="fiveDayWeatherForecastTable">
                        <tbody>{this.showFiveWeatherForecast()}</tbody>
                    </table>
                </div>
            </>);
    }
}

export default FiveDayWeatherForecast;