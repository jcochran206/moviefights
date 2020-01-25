const fetchDAta = async (searchTerm) => {
   const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        s: searchTerm,
        apikey: 'your-api-key'
      }
    });
    // to handle error for missing movies
    if (response.data.Error){
      return [];
    }
    return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b> Search for movie </b></label>
  <input type="text" class="input" placeholder="search for movie">
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

// create variable for selectors
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


//iterate thry movies objects from api
const onInput = async event => {
  const movies = await fetchDAta(event.target.value);

  if(!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  //results to container to clear out data
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for(let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster; //tenary for

    option.classList.add('dropdown-item');
    option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;
    // updates text on search when clicked on search
    option.addEventListener('click', ()=> {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
      // helper function to create movie details in index
      onMovieSelect(movie);

    });



    resultsWrapper.appendChild(option);
    }
  };
//add listener to wait for user interaction
input.addEventListener('input', debounce(onInput, 1000));
// closes search bar when on user clicks
document.addEventListener('click', event => {
  if(!root.contains(event.target)){
    dropdown.classList.remove('is-active');
  }
});
// helper function to grab id of movie to obtain details
const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
     params: {
       i: movie.imdbID,
       apikey: 'your-api-key'
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
  `;

}
