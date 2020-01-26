import React from 'react';
import './CitySelection.css';

class CitySelection extends React.Component {
    constructor(props) {
        super(props);
        this.handleCitySelection = this.handleCitySelection.bind(this);
    }

    showInputContainerButton() {
        let inputContainerCityOpacity = document.getElementById("inputContainerCity");
        if (inputContainerCityOpacity.style.opacity === "0") {
            setTimeout(() => inputContainerCityOpacity.style.opacity = "1", 0);
        } else {
            setTimeout(() => inputContainerCityOpacity.style.opacity = "0", 0);
        }
    }

    handleCitySelection() {
        const inputCityValue = document.getElementById("inputCity").value;
        this.props.onCitySubmit(inputCityValue);
    }

    hideErrorMessage() {
        document.getElementById("inputCity").classList.remove("invalidInputCity");
        document.getElementById("errorMessageCity").style.display = "none";
    }

    render() {
        return (
            <div className="citySelection">
                <div className="inputContainerCityButton" onClick={this.showInputContainerButton}>
                    <div>choose another city</div>
                    <div><i className="fas fa-angle-double-down inputCityButton"></i></div>
                </div>
                <div id="inputContainerCity">
                    <input
                        type="text"
                        className="inputCity"
                        placeholder="Choose a city"
                        id="inputCity"
                        onChange={this.hideErrorMessage}
                    />
                    <button
                        type="submit"
                        className="submitCity"
                        onClick={this.handleCitySelection}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="errorMessageCity" id="errorMessageCity">This city is not found!</div>
            </div>
        );
    }
}

export default CitySelection;