import React, { Component } from 'react';

import styles from './autocomplete.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log('Tai mano');

    // const movies = [
    //   { id: 0, title: 'Averenger', overview: 'jhjhjugjg' },
    //   { id: 1, title: 'Averengerdgdg', overview: 'jhjhjugjjgfkjfgkg' }
    // ];
    //
    // this.state = {
    //   rows: [
    //     <p key="1">This is my row1</p>,
    //     <p key="2">This is my row2</p>,
    //     <p key="3">This is my row3</p>
    //   ]
    // };
    // const movieRows = [];
    // movies.forEach(movie => {
    //   console.log(movie.id);
    //   movieRows.push(
    //     <p key={movie.id}>
    //       movie title:
    //       {movie.title}
    //     </p>
    //   );
    // });
    // this.state = { rows: movieRows };
    this.performSearch();
  }
  performSearch(searchTerm) {
    // const urlString = `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query={paieskos raktas}&page=1&include_adult=false`;

    const urlString =
      'https://api.themoviedb.org/3/search/movie?' +
      `api_key=cab2afe8b43cf5386e374c47aeef4fca` +
      `&language=en-US&query=${searchTerm}` +
      '&page=1&include_adult=false';
    // ajax({
    //   url: urlString,
    //   success: searchResults => {
    //     console.log('tikrai');
    //   },
    //   error: (xhr, status, err) => {
    //     console.error('failed');
    //   }
    // });
    fetch(urlString)
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.movies;
        const results = searchResults.results;

        const movieRows = [];

        results.forEach(movie => {
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movie);
        });
        this.setState({ rows: movieRows });
      })
      .catch(error => {
        console.error(error);
      });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div className={styles.container}>
        <input onChange={this.searchChangeHandler.bind(this)} placeholder="Search..." />
        {this.state.rows}
      </div>
    );
  }
}

export default Autocomplete;
