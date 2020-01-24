const fetchDAta = async (searchTerm) => {
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
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b> Search for movie </b></label>
  <input type="text" name="" value="" placeholder="search for movie">
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

// create input variable
const input = document.querySelector('input');
//iterate thry movies objects from api
const onInput = async event => {
  const movies = await fetchDAta(event.target.value);

  for(let movie of movies) {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${movie.Poster}" />
    <h1>${movie.Title}<h1>
    `;

    document.querySelector('#target').appendChild(div);
    }
  };
//add listener to wait for user interaction
input.addEventListener('input', debounce(onInput, 1000));
