import React from "react";
import "./FiveDayWeatherForecast.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import moment from "moment";

class FiveDayWeatherForecast extends React.Component {
    defineFiveDayWeatherForecastData() {
        const todayDate = new Date().getDate(),
              fiveDayWeatherForecastData = [];
        this.props.weatherForecastData.forEach((data) => {
            if (new Date(data.dt_txt).getDate() !== todayDate) {
                fiveDayWeatherForecastData.push(data);
            }
        });
        return fiveDayWeatherForecastData;
    }

    sortWeatherForecastDataForRows() {
        const weatherForecastDataForRows = [],
              data = this.defineFiveDayWeatherForecastData();
        let nextDay = moment().add(1, "days").format("DD.MM.YYYY").slice(0, 5),
            rowData = {},
            dataByHour = [];
    
        for(let i = 0; i < data.length; i++) {
            const date = moment(new Date(data[i].dt_txt)).format("DD.MM.YYYY").slice(0, 5);

            if(date === nextDay) {
                rowData.day = moment(new Date(data[i].dt_txt)).format("ddd");
                rowData.date = date;
                dataByHour.push({
                    hour: moment(new Date(data[i].dt_txt)).format("HH:mm"),
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
        let data = this.sortWeatherForecastDataForRows(),
            fiveDayWeatherOutputData = [];

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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    toggleWeatherForecastPages(container) {
        const components = document.querySelectorAll("." + container);
        let hiddenComponents, shownComponents, timer = 0;

        if(container === "threeHourWeatherForecastContainer") {
            hiddenComponents = document.querySelectorAll(".threeHourWeatherForecastContainer");
            shownComponents = document.querySelectorAll(".fiveDayWeatherForecastContainer");
        } else {
            hiddenComponents = document.querySelectorAll(".fiveDayWeatherForecastContainer");
            shownComponents = document.querySelectorAll(".threeHourWeatherForecastContainer");
        }

        hiddenComponents.forEach(async (component) => {
            await this.sleep(timer);
            setTimeout(() => {component.classList.add("slowDisplayNone")}, 400 + timer);  
            timer +=400;
            await this.sleep(timer);
            if(components.length * 400 === timer) {
                timer +=400;
                await this.sleep(timer);
                hiddenComponents.forEach((component) => component.style.display = "none");
            }
            timer +=400;
            await this.sleep(timer);
            setTimeout(() => {component.classList.remove("slowDisplayNone")}, 0);
            shownComponents.forEach((component) => component.style.display = "block");
        });
    }
 
    render() {
        return (
            <>
                <div className="threeHourWeatherForecastContainer">
                    <div
                        className="fiveDayWeatherForecastButton"
                        onClick={() => this.toggleWeatherForecastPages("threeHourWeatherForecastContainer")}
                    >
                        <div className="fiveDayWeatherForecastLabel">5 day weather forecast</div>
                        <IoIosArrowForward />
                    </div>
                </div>
                <div className="fiveDayWeatherForecastContainer">
                    <div
                        className="currentWeatherForecastButton"
                        onClick={() => this.toggleWeatherForecastPages("fiveDayWeatherForecastContainer")}
                    >
                        <IoIosArrowBack />
                        <div className="currentWeatherForecastLabel">back to today forecast</div>
                    </div>
                </div>
                <div className="fiveDayWeatherForecastContainer">
                    <div className="fiveDayWeatherForecastTableContainer fiveDayWeatherForecastContainer">
                        <table className="fiveDayWeatherForecastTable">
                            <tbody>{this.showFiveWeatherForecast()}</tbody>
                        </table>
                    </div>
                </div>
            </>);
    }
}

export default FiveDayWeatherForecast;