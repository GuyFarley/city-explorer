import React from 'react';
import Table from 'react-bootstrap/Table'

class Weather extends React.Component {


  render() {

    return (

      <Table
        striped
        bordered
        hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>High Temp</th>
            <th>Forecast</th>
          </tr>
        </thead>
        <tbody>

          {this.props.weather.data.map((day, idx) => {
            return (
              <tr key={idx}>
                <td>{this.props.weather.data.date}</td>
                <td>{this.props.weather.data.temp}</td>
                <td>{this.props.weather.data.description}</td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    );
  }
}


export default Weather;