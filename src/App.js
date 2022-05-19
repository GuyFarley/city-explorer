import './App.css';
import Weather from './Weather.js'
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'
import Figure from 'react-bootstrap/Figure'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityLat: '',
      cityLon: '',
      weatherData: [],
      movieData: [],
      error: false,
      showMap: false,
      showTable: false,
      showWeather: false
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);

      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?latitude=${cityInfo.data[0].lat}&longitude=${cityInfo.data[0].lon}`;
      // let weatherURL = `https://gf-city-explorer-301d85.herokuapp.com/weather?latitude=${cityInfo.data[0].lat}&longitude=${cityInfo.data[0].lon}`;

      let weather = await axios.get(weatherURL);

      this.setState({
        cityName: cityInfo.data[0].display_name,
        cityLat: cityInfo.data[0].lat,
        cityLon: cityInfo.data[0].lon,
        weatherData: weather,
        showMap: true,
        showTable: true,
        showWeather: true,
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

    try {

      let movieURL = `${process.env.REACT_APP_SERVER}/movies?movie_city=${this.state.city}`;
      // let movieURL = `https://gf-city-explorer-301d85.herokuapp.com/movies?movie_city=${this.state.city}`;
      console.log(movieURL);
      let movies = await axios.get(movieURL);
      console.log(movies);

      this.setState({
        movieData: movies,
        error: false
      });

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value

    });
  }

  render() {

    return (
      <>
        {this.state.error ?
          <Alert key={'danger'} variant={'danger'}>
            {this.state.errorMessage}
          </Alert>
          : null}

        <Form onSubmit={this.handleCitySubmit}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inputCity">Please enter a city name</Form.Label>
              <Form.Control
                type="text"
                id="inputCity"
                onChange={this.cityChange}
              />
              <Button variant="primary" type="submit">Explore!</Button>
            </Col>
          </Row>
        </Form>

        {
          this.state.showTable ?
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
            </Table> : null
        }
        {
          this.state.showMap ?
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
            </Figure> : null
        }
        {
          this.state.showWeather ?
            <Weather
              city={this.state.city}
              cityLat={this.state.cityLat}
              cityLon={this.state.cityLon}
              weather={this.state.weatherData}
            /> : null}
      </>
    );
  }
}

export default App;
