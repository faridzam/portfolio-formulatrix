export function throttle(func, delay) {
  let lastExecutionTime = 0;
  
  return function () {
    const context = this;
    const args = arguments;
    const currentTime = Date.now();

    if (currentTime - lastExecutionTime >= delay) {
      func.apply(context, args);
      lastExecutionTime = currentTime;
    }
  };
}

export function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}