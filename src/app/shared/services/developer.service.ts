import { Injectable } from '@angular/core';
import { developerData } from '@shared/datas/developer.data';
import { Developer } from '../interfaces/developer';
import { Link } from '../interfaces/developer';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  developer: Developer = developerData;

  getFullName(): string {
    return this.developer.firstName + ' ' + this.developer.lastName;
  }

  getDeveloper(): Developer {
    return this.developer;
  }

  getLinks(): Link[] {
    return this.developer.links;
  }
}
