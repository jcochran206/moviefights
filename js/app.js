//fetch data from omdbapi using axios fetch
const fetchDAta = async (searchTerm) => {
  axios.get('http://www.omdbapi.com/', {
      params: {
        s: searchTerm,
        apikey: 'your_api_here',
      }
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const onInput = event => {
  fetchDAta(event.target.value);
};
//add listener to wait for user interaction
input.addEventListener('input', debounce(onInput, 1000));
