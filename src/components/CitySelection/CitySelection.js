import React from "react";
import "./CitySelection.css";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

class CitySelection extends React.Component {
    constructor(props) {
        super(props);
        this.toggleInputContainerOpacity = this.toggleInputContainerOpacity.bind(this);
        this.handleCitySelection = this.handleCitySelection.bind(this);
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
    }

    toggleInputContainerOpacity() {
        let inputContainerCityOpacity = document.querySelector(".citySelectionContainer");
        (inputContainerCityOpacity.style.opacity === "" || inputContainerCityOpacity.style.opacity === "0")
            ? inputContainerCityOpacity.style.opacity = "1"
            : inputContainerCityOpacity.style.opacity = "0";
        this.hideErrorMessage();
    }

    handleCitySelection() {
        const inputCityValue = document.querySelector(".inputCity").value;
        if (inputCityValue) {
            this.props.onCitySubmit(inputCityValue);
        }
    }

    hideErrorMessage() {
        document.querySelector(".inputCity").classList.remove("invalidInputCity");
        document.querySelector(".errorMessageCity").style.display = "none";
    }

    render() {
        return (
            <div className="threeHourWeatherForecastContainer" name="citySelection">
                <div className="inputCityButtonContainer" onClick={this.toggleInputContainerOpacity}>
                    <div>choose another city</div>
                    <div className="inputCityButton"><IoIosArrowDown /></div>
                </div>
                <div className="citySelectionContainer" ref={this.citySelectionContainer}>
                    <input
                        type="text"
                        className="inputCity"
                        placeholder="Choose a city"
                        onChange={this.hideErrorMessage}
                    />
                    <button
                        type="submit"
                        className="submitCity"
                        onClick={this.handleCitySelection}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
                <div className="errorMessageCity">This city is not found!</div>
            </div>
        );
    }
}

export default CitySelection;