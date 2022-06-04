import { Component } from '@angular/core';
import { Developer } from '@shared/interfaces/developer';
import { Link } from '@shared/interfaces/developer';
import { DeveloperService } from '@shared/services/developer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  developer: Developer = this.developerService.getDeveloper();
  links: Link[] = this.developer.links;
  year = new Date().getFullYear();

  constructor(private developerService: DeveloperService) {}
}
