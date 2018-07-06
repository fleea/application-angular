import { AppActions } from './actions';

export interface AppState {
  loading: boolean;
  data: Array<any>;
  searchQuery: string;
  nationalities: Array<string>;
  selectedNationality: string;
  genders: Array<string>;
  selectedGender: string;
}

const initialState: AppState = {
  loading: false,
  data: [],
  searchQuery: '',
  nationalities: [],
  selectedNationality: '',
  genders: [],
  selectedGender: ''
};

export const appReducers = (state: AppState = initialState, action: any): AppState => {
  switch (action.type) {
    case AppActions.DATA_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case AppActions.DATA_FETCH:
    case AppActions.LOADING_START: {
      return {
        ...state,
        loading: true
      };
    }
    case AppActions.LOADING_STOP: {
      return {
        ...state,
        loading: false
      };
    }
    case AppActions.CHANGE_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery : action.payload
      };
    }
    case AppActions.GET_NATIONALITIES_FROM_DATA: {
      return {
        ...state,
        nationalities : action.payload
      };
    }
    case AppActions.CHANGE_SELECTED_NATIONALITY: {
      return {
        ...state,
        selectedNationality : action.payload
      };
    }
    case AppActions.GET_GENDERS_FROM_DATA: {
      return {
        ...state,
        genders : action.payload
      };
    }
    case AppActions.CHANGE_SELECTED_GENDER: {
      return {
        ...state,
        selectedGender : action.payload
      };
    }
    default: {
      return state;
    }
  }
};
