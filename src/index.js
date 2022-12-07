import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

countryList = document.querySelector('.country-list');
infoContainer = document.querySelector('.country-info');
searchField = document.getElementById('search-box');

const DEBOUNCE_DELAY = 300;

let name = searchField.value;

searchField.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const API = '?fields=name.official,capital,population,flags.svg,languages';

  return fetch(`$(url)${name}${API}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    //   else if (res === 404) {
    //     Notiflix.Report.failure('Oops, there is no country with that name');
    //   }
    return res.json();
  });
}

// .then(data => {
//       console.log(data);
//     });

// function onInputSearch(e) {
//   fetchCountries({ name: searchField.value });
//   console.log(name);
// }

//   else if (res === 404) {
//     Notiflix.Report.failure('Oops, there is no country with that name');
//   }

// more then 10 countries = Notiflix.Report.failure(
//   'Too many matches found. Please enter a more specific name.'
// );

// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all

// .debounce(func, [wait=0], [options={}])

// trim();

// Notiflix.Report.warning('Title', 'Message', 'Button Text');
// Notiflix.Report.info('Title', 'Message', 'Button Text');

/* <li class="country-item">
  <svg xmlns="" class="country-flag">
    ${flags.svg}
  </svg>
  <p class="country-name"></p>
</li>; */
