import './App.css';
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'
import Figure from 'react-bootstrap/Figure'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityLat: '',
      cityLon: '',
      showMap: false
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
    let cityInfo = await axios.get(url);

    this.setState({
      cityName: cityInfo.data[0].display_name,
      cityLat: cityInfo.data[0].lat,
      cityLon: cityInfo.data[0].lon,
      showMap: true
    });

  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }


  render() {

    return (
      <>
        <form onSubmit={this.handleCitySubmit} >
          <label htmlFor="cityName">Please Choose a City</label>
          <input type="text" id="cityName" onChange={this.cityChange} />
          <button type="submit">Explore!</button>
        </form>

        <Table
          striped
          bordered
          hover>
          <thead>
            <tr>
              <th>City Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.cityName}</td>
              <td>{this.state.cityLat}</td>
              <td>{this.state.cityLon}</td>
            </tr>
          </tbody>
        </Table>
        {this.state.showMap ?
          <Figure>
            <Figure.Image
              width={400}
              height={400}
              alt="Map of {this.state.cityName}"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=12`}
            />
            <Figure.Caption>
              {this.state.cityName}
            </Figure.Caption>
          </Figure> : null}
      </>
    );
  }
}

export default App;
