import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AppActions } from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs/index';
import { debounceTime, tap } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { getAllNationalities, getAllGenders } from './selectors';

@Injectable()
export class AppEffects {
  constructor(private actions: Actions, private http: HttpClient) {
  }

  @Effect()
  public fetchData: Observable<any> = this.actions.ofType(AppActions.DATA_FETCH).pipe(
    debounceTime(1000),
    switchMap(() => {
      const  randomUser = 'https://randomuser.me/api/?results=500';
      // return of({ type: AppActions.DATA_FETCH_SUCCESS, payload: data}); */

      return this.http.get(randomUser)
        .pipe(
          map(({results}: any) => ({ type: AppActions.DATA_FETCH_SUCCESS, payload: results})),
        );
    }),
    catchError(error => console.log(error) || of({ type: AppActions.DATA_FETCH_ERROR }))
  );

  @Effect()
  public getAllNationalities: Observable<any> = this.actions.ofType(AppActions.DATA_FETCH_SUCCESS).pipe(
      map(({ payload }: any) => ({ type: AppActions.GET_NATIONALITIES_FROM_DATA, payload: getAllNationalities(payload)}))
    );

  @Effect()
  public getAllGenders: Observable<any> = this.actions.ofType(AppActions.DATA_FETCH_SUCCESS).pipe(
      map(({ payload }: any) => ({ type: AppActions.GET_GENDERS_FROM_DATA, payload: getAllGenders(payload)}))
    );
}
