import React, { Component } from 'react';

import $ from 'jquery';
import styles from './autocomplete.css';


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch('ant man');
  }
  performSearch(searchTerm) {
    // const urlString = `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=marvel&page=1&include_adult=false`;

    const urlString =
      'https://api.themoviedb.org/3/search/movie?' +
      `api_key=cab2afe8b43cf5386e374c47aeef4fca` +
      `&language=en-US&query=${searchTerm}` +
      '&page=1&include_adult=false';

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log('tikrai');
        console.log(searchResults);
        const results = searchResults.results;
        // console.log (results [0])
        const movieRow = [];

        results.forEach(movie => {
          const movieRows = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movie);
        });
      },
      error: (xhr, status, err) => {
        console.error('failed');
      }
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
        <div className={styles.wrapper}>
          <div className={styles.menu}>
            <div className={styles.logo}>
                <img src="film.png"/>
            </div>
            <input onChange={this.searchChangeHandler.bind(this)} placeholder="Enter movie name" />
            <div className={styles.search}>
              <img width="20px" src="search.png" />
            </div>
            {this.state.rows}
          </div>
        </div>
      </div>
    );
  }
}

export default Autocomplete;
