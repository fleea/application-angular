import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from './core/selectors';
import { AppActions } from './core/actions';
import { State } from './core/reducer-map';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  loading: Observable<boolean>;
  data: Observable<Array<any>>;
  nationalities: Observable<Array<string>>;
  selectedNationality: Observable<string>;
  genders: Observable<Array<string>>;
  selectedGender: Observable<string>;
  autoCompleteNames: Observable<Array<string>>;

  constructor(private store: Store<State>) {}

  changeSelectedNationality = nationality => this.store.dispatch({ type: AppActions.CHANGE_SELECTED_NATIONALITY, payload: nationality });
  changeSelectedGender = gender => this.store.dispatch({ type: AppActions.CHANGE_SELECTED_GENDER, payload: gender });
  changeSearchQuery = query => typeof query === 'string' &&
  this.store.dispatch({ type: AppActions.CHANGE_SEARCH_QUERY, payload: !!query ? query.trim() : query })


  ngOnInit() {
    this.store.dispatch({ type: AppActions.DATA_FETCH });

    this.loading = this.store.select(AppSelectors.loading);
    this.data = this.store.select(AppSelectors.filteredData);
    this.nationalities = this.store.select(AppSelectors.nationalities);
    this.selectedNationality = this.store.select(AppSelectors.selectedNationality);
    this.genders = this.store.select(AppSelectors.genders);
    this.selectedGender = this.store.select(AppSelectors.selectedGender);
    this.autoCompleteNames = this.store.select(AppSelectors.autoCompleteNames);
  }
}
