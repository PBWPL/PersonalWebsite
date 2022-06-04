import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, mergeAll, toArray } from 'rxjs/operators';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient, @Inject(LOCALE_ID) private locale: string) {}

  getProjects(featured?: boolean): Observable<Project[]> {
    let projects$ = this.httpClient.get<Project[]>(`assets/json/projects.${this.locale}.json`);

    if (featured) {
      return projects$.pipe(
        mergeAll(),
        filter((project) => project.featured || false),
        toArray()
      );
    }

    return projects$;
  }
}
