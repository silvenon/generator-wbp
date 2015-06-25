/* eslint no-console: 0 */

import fetch from './helpers/fetch';

import 'svg4everybody';
import './fonts';

console.log('Hello World');

fetch('/index.html').then((res) => {
  console.log(res);
});
