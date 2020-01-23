import React from 'react';
import './CitySelection.css';

class CitySelection extends React.Component {
    constructor(props) {
        super(props);
        this.handleCitySelection = this.handleCitySelection.bind(this);
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
            <>
                <div className="inputContainerCity">
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
            </>
        );
    }
}

export default CitySelection;