import React from 'react';
import Table from 'react-bootstrap/Table'

class Movies extends React.Component {

  render() {

    return (

      <Table
        striped
        bordered
        hover>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src={this.props.movies.data[0].poster_path} width={100} alt={this.props.movies.data[0].title} /></td>
            <td>{this.props.movies.data[0].title}</td>
            <td>{this.props.movies.data[0].release_date}</td>
            <td>{this.props.movies.data[0].overview}</td>
          </tr>
          <tr>
            <td><img src={this.props.movies.data[1].poster_path} width={100} alt={this.props.movies.data[0].title} /></td>
            <td>{this.props.movies.data[1].title}</td>
            <td>{this.props.movies.data[1].release_date}</td>
            <td>{this.props.movies.data[1].overview}</td>
          </tr>
          <tr>
            <td><img src={this.props.movies.data[2].poster_path} width={100} alt={this.props.movies.data[0].title} /></td>
            <td>{this.props.movies.data[2].title}</td>
            <td>{this.props.movies.data[2].release_date}</td>
            <td>{this.props.movies.data[2].overview}</td>
          </tr>

        </tbody>
      </Table >
    );
  }
}

export default Movies;