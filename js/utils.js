// function for debouncing code using spread operator and apply method
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return(...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  }
};
