import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Feeling } from '../interfaces/feeling';

@Injectable({
  providedIn: 'root'
})
export class FeelingService {
  constructor(private http: HttpClient) {}

  getFeelings(): Observable<Feeling[]> {
    return this.http.get<Feeling[]>('http://localhost:4200/api/feelings').pipe(
      map((feelings) => feelings.sort((a, b) => new Date(a.full_date).getTime() - new Date(b.full_date).getTime())),
      catchError((err) => {
        console.log(err.error.message);
        return EMPTY;
      })
    );
  }

  getFeelingsTwoWeeks(): Observable<Feeling[]> {
    let date = new Date(Date.now() - 12096e5);
    return this.getFeelings().pipe(
      map((feelings) => feelings.filter((feeling) => new Date(feeling.full_date).getTime() > date.getTime()))
    );
  }

  getFeelingById(id: number): Observable<Feeling> {
    return this.getFeelings().pipe(map((feelings) => feelings[id]));
  }

  getFeelingLatest(): Observable<Feeling> {
    return this.getFeelings().pipe(map((feelings) => feelings[feelings.length - 1]));
  }
}
