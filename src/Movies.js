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
          {this.props.movies.data.map((movie, idx) => {
            return (<tr key={idx}>
              <td><img src={this.props.movies.data[idx].poster_path} width={100} alt={this.props.movies.data[idx].title} /></td>
              <td>{this.props.movies.data[idx].title}</td>
              <td>{this.props.movies.data[idx].release_date}</td>
              <td>{this.props.movies.data[idx].overview}</td>
            </tr>)
          })}
        </tbody>
      </Table >
    );
  }
}

export default Movies;