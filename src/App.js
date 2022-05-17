import './App.css';
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityLat: '',
      cityLon: '',
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
    console.log(this.state.city);
    let cityInfo = await axios.get(url);

    console.log(cityInfo.data[0]);
    console.log(cityInfo.data[0].lat);
    console.log(cityInfo.data[0].lon);
    this.setState({
      cityName: cityInfo.data[0].display_name,
      cityLat: cityInfo.data[0].lat,
      cityLon: cityInfo.data[0].lon
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
      </>
    );
  }
}

export default App;
