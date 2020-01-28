createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster; //tenary for
    return `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie){
    onMovieSelect(movie)
  },
  inputValue(movie){
    return movie.Title;
  },
  async fetchData(searchTerm) {
     const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          s: searchTerm,
          apikey: 'your api key'
        }
      });
      // to handle error for missing movies
      if (response.data.Error){
        return [];
      }
      return response.data.Search;
  }
});


// helper function to grab id of movie to obtain details
const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
     params: {
       i: movie.imdbID,
       apikey: 'your api key'
     }
   });

   document.querySelector('.summary').innerHTML = movieTemplate(response.data);
}
//movie details template allow to render info in index
const movieTemplate = (movieDetail) => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieDetail.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</>
  </article>

  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</>
  </article>
  `;

}
