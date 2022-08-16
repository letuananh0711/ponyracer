import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  // contructor
  constructor(private http: HttpClient) {}

  // list all the pending races with the API call
  list(): Observable<Array<RaceModel>> {
    // configure params for gettting only the pending races
    const params = {
      status: 'PENDING'
    };
    // return an observable for the get method
    return this.http.get<Array<RaceModel>>(`https://ponyracer.ninja-squad.com/api/races`, { params });
  }
}
