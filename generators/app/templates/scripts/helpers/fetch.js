import 'es6-promise';
import 'fetch';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export default (url, options) => {
  return fetch(url, options)
    .then(status);
};
