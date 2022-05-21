import './App.css';
import Weather from './Weather.js'
import Movie from './Movies.js'
import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table'
import Figure from 'react-bootstrap/Figure'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      showWeather: false,
      showMovies: false
    }
  }

  getCity = async () => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityInfo = await axios.get(url);

      this.setState({
        cityName: cityInfo.data[0].display_name,
        cityLat: cityInfo.data[0].lat,
        cityLon: cityInfo.data[0].lon,
        showMap: true,
        error: false
      });

      this.getWeather(cityInfo.data[0].lat, cityInfo.data[0].lon);

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  getWeather = async (lat, lon) => {
    try {

      // let weatherURL = `${process.env.REACT_APP_SERVER}/weather?latitude=${lat}&longitude=${lon}`;
      let weatherURL = `https://gf-city-explorer-301d85.herokuapp.com/weather?latitude=${cityInfo.data[0].lat}&longitude=${cityInfo.data[0].lon}`;

      let weather = await axios.get(weatherURL);

      this.setState({
        weatherData: weather,
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
  }

  getMovies = async () => {
    try {
      // let movieURL = `${process.env.REACT_APP_SERVER}/movies?movie_city=${this.state.city}`;
      let movieURL = `https://gf-city-explorer-301d85.herokuapp.com/movies?movie_city=${this.state.city}`;

      let movies = await axios.get(movieURL);

      this.setState({
        movieData: movies,
        showMovies: true,
        error: false
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      this.getCity();
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
    this.getMovies();
  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  render() {

    return (
      <div className='appBody'>
        {this.state.error ?
          <Alert key={'danger'} variant={'danger'}>
            {this.state.errorMessage}
          </Alert>
          : null}
        <div className="h1">
          <h1>City Explorer</h1>
        </div>
        <div className="formClass">

          <Form onSubmit={this.handleCitySubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Please enter city name"
                onChange={this.cityChange}
              />
              <Button variant="primary" type="submit">Explore!</Button>

            </Form.Group>
          </Form>
        </div>
        {
          this.state.showTable ?
            <div className="cityTable">

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
              </Table></div> : null
        }
        {
          this.state.showMap ?
            <div className="cityMap">

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
              </Figure></div> : null
        }
        {
          this.state.showWeather ?
            <div className="cityWeather">

              <Weather
                city={this.state.city}
                cityLat={this.state.cityLat}
                cityLon={this.state.cityLon}
                weather={this.state.weatherData}
              /></div> : null}
        {
          this.state.showMovies ?
            <div className="cityMovies">

              <Movie
                movies={this.state.movieData}
              /></div> : null
        }
      </div>
    );
  }
}

export default App;
