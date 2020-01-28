const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

  root.innerHTML = `
    <label><b> Search </b></label>
    <input type="text" class="input" placeholder="search for movie">
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  // create variable for selectors
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');


  //iterate thry movies objects from api
  const onInput = async event => {
    const items = await fetchData(event.target.value);

    if(!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    //results to container to clear out data
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for(let item of items) {
      const option = document.createElement('a');
      const imgSrc = item.Poster === 'N/A' ? '' : item.Poster; //tenary for

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      // updates text on search when clicked on search
      option.addEventListener('click', ()=> {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        // helper function to create item details in index
        onOptionSelect(item);

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
};
