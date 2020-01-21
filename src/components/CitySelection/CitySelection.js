import React from 'react';
import './CitySelection.css';

class CitySelection extends React.Component {
    constructor(props) {
        super(props);
        this.handleCitySelection = this.handleCitySelection.bind(this);
    }

    handleCitySelection() {
        const inputCityValue = document.getElementsByName("city")[0].value;
        this.props.onCitySubmit(inputCityValue);
    }

    render() {
        return (
            <div className="inputContainerCity">
                <input type="text" name="city" placeholder="Choose a city" className="inputCity"/>
                <button type="submit" className="submitCity" onClick={this.handleCitySelection}><i className="fas fa-chevron-right"></i></button>
            </div>
        );
    }
}

export default CitySelection;