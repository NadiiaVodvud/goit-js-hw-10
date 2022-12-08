import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';

const refs = {
  countryList: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
  searchField: document.getElementById('search-box'),
};

refs.searchField.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  const name = e.target.value.trim();

  if (!name) {
    cleanMarkup();
  } else {
    fetchCountries(name).then(createCountriesItemsMarcup).catch(onFetchError);
  }
}
function createCountriesItemsMarcup(countries) {
  if (countries.length !== 1) {
    renderCountriesList(countries);
  } else {
    renderCountriesCard(countries);
    if (countries.length > 10) {
      Notify.info(INFO_MESSAGE);
      cleanMarkup();
    }
  }
}

// function createCountriesItemsMarcup(countries) {
//   if (countries.length !== 1) {
//     const markup = countries
//       .map(({ name, flags }) => {
//         return `<li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.official}" width="50"><p class="country-title">${name.official}</p></li>`;
//       })
//       .join('');
//     refs.countryList.innerHTML = markup;
//   } else {
//     const markup = countries
//       .map(({ name, flags, capital, population, languages }) => {
//         return `<div class="country-card"><div class="country-card-box"><img class="country-card-svg"  src="${
//           flags.svg
//         }"  alt="flag of ${
//           name.official
//         }" width="70"><p class="country-card-title">${
//           name.official
//         }</p></div><p class="country-card-text">Capital:<span class="country-card-topic">${capital}</span></p><p class="country-card-text">Population:<span class="country-card-topic">${population}</span></p><p class="country-card-text">Languages:<span class="country-card-topic">${Object.values(
//           languages
//         )}</span></p></div>`;
//       })
//       .join('');
//     refs.countryList.innerHTML = markup;

//     if (countries.length > 10) {
//       Notify.info(INFO_MESSAGE);
//       cleanMarkup();
//     }
//   }
// }

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      `<li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.official}" width="50"><p class="country-title">${name.official}</p></li>`;
    })
    .join('');
  return (refs.countryList.innerHTML = markup);
}

function renderCountriesCard(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      `<div class="country-card-box"><img class="country-card-svg"  src="${
        flags.svg
      }"  alt="flag of ${
        name.official
      }" width="70"><p class="country-card-title">${
        name.official
      }</p></div><p class="country-card-text">Capital:<span class="country-card-topic">${capital}</span></p><p class="country-card-text">Population:<span class="country-card-topic">${population}</span></p><p class="country-card-text">Languages:<span class="country-card-topic">${Object.values(
        languages
      )}</span></p>`;
    })
    .join('');
  return (refs.infoContainer.innerHTML = markup);
}

function cleanMarkup() {
  refs.countryList.innerHTML = '';
  refs.infoContainer.innerHTML = '';
}

function onFetchError() {
  cleanMarkup();
  Notify.failure(ERROR_MESSAGE);
}

// Notiflix.Report.warning('Title', 'Message', 'Button Text');
// Notiflix.Report.info('Title', 'Message', 'Button Text');
