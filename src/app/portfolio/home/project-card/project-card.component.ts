import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Project } from '@shared/interfaces/project';
import { portfolioPaths } from '@portfolio/portfolio-routing.module';

@Component({
  selector: 'home-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  isBrowser: boolean;

  @Input() project?: Project;

  portfolioPaths = portfolioPaths;

  ngOnInit(): void {}

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
