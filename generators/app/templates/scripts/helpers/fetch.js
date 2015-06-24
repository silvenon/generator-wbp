import 'es6-promise';
import 'fetch';

export default (url, options) => {
  return fetch(url, options);
};
