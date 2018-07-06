import { State } from './reducer-map';
import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';
import * as R from 'ramda';

const getState = (state: State) => state.app;
const loading = (state: AppState) => state.loading;
const data = (state: AppState) => state.data;
const searchQuery = (state: AppState) => state.searchQuery;
const nationalities = (state: AppState) => state.nationalities;
const selectedNationality = (state: AppState) => state.selectedNationality;
const genders = (state: AppState) => state.genders;
const selectedGender = (state: AppState) => state.selectedGender;

/** Constant */
const NATIONALITY = 'nat';
const GENDER = 'gender';

/** GETTING ALL DATA */
const getAllBy = key => array => array.map(r => r[key]).filter((elem, pos, arr) => arr.indexOf(elem) === pos);
const addAllOption = array => ['', ...array];
export const getAllNationalities = R.compose(addAllOption, getAllBy(NATIONALITY));
export const getAllGenders = R.compose(addAllOption, getAllBy(GENDER));

/** OLD FUNCTIONS WE MADE WHEN PAIR PROGRAMMING*/
// const filterBySearchQuery = (state: AppState) => state.searchQuery ?
//      state.data.filter(({name}) => `${name.first} ${name.last}`.includes(state.searchQuery)) : state.data;

/** FILTERING SELECTED DATA */
const filterBySearchQuery = query => array =>
    query ? array.filter(({name}) => `${name.first} ${name.last}`.includes(query)) : array;

const filterBy = key => selectedValue => array => selectedValue ? array.filter((a) => a[key] === selectedValue ) : array;
const filterByNationality = filterBy(NATIONALITY);
const filterByGender = filterBy(GENDER);

const filteredData = (state: AppState) => R.compose(
  filterBySearchQuery(state.searchQuery),
  filterByNationality(state.selectedNationality),
  filterByGender(state.selectedGender)
)(state.data);

/** MAIN EXPORT */
export const AppSelectors = {
  loading: createSelector(getState, loading),
  data: createSelector(getState, data),
  filteredData: createSelector(getState, filteredData),
  searchQuery: createSelector(getState, searchQuery),
  nationalities: createSelector(getState, nationalities),
  selectedNationality: createSelector(getState, selectedNationality),
  genders: createSelector(getState, genders),
  selectedGender: createSelector(getState, selectedGender)
};

