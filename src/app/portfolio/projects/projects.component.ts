import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Project, Tech } from '@shared/interfaces/project';
import { ProjectService } from '@shared/services/project.service';
import { SEOService } from '@shared/services/seo.service';

@Component({
  selector: 'portfolio-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  isBrowser: boolean;

  tags: any[] = [];
  selectedTags: any[] = [];
  snackShowed: boolean = false;
  snackBarRef?: MatSnackBarRef<TextOnlySnackBar>;
  projects?: Project[];
  projectstmp?: Project[];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.snackShowed) {
      let element = document.documentElement;
      let body = document.body;

      let scrollProgress =
        (element['scrollTop'] || body['scrollTop']) /
        ((element['scrollHeight'] || body['scrollHeight']) - element.clientHeight);

      if (scrollProgress === 1) {
        this.snackShowed = true;
        this.openSnackBar();
      }
    }
  }

  openSnackBar() {
    this.snackBarRef = this.snackBar.open(
      $localize`:@@projectsMessageMoreSoon:More of my work will 🚀 land here soon.`,
      'X'
    );

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.snackShowed = false;
    });
  }

  sort(type: any) {
    if (!type.isSelected) {
      this.selectedTags.push(type);
    } else {
      this.selectedTags = this.selectedTags.filter((tag) => tag !== type);
    }

    this.tags.find((tag) => tag.name === type.name).isSelected = !type.isSelected;

    if (this.selectedTags.length !== 0) {
      this.projects = this.projectstmp?.filter((project) =>
        project.techStack.find((tech) => this.selectedTags.some((tag) => tag.name === tech.name))
      );
    } else {
      this.projects = this.projectstmp;
    }
  }

  renderDefaultProjects() {
    this.selectedTags = [];
    this.tags.forEach((tag) => (tag.isSelected = false));
    this.projects = this.projectstmp;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.snackBarRef) this.snackBarRef.dismiss();
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private project: ProjectService,
    private snackBar: MatSnackBar,
    private seoService: SEOService,
    private renderer: Renderer2
  ) {
    this.seoService.setTitle($localize`:@@projectsTitle:Projects`);
    if (isPlatformServer(platformId)) {
      this.seoService.setCanonicalUrl(this.renderer);
      this.seoService.setAlternateUrl(this.renderer);
    }

    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.project.getProjects().subscribe((projects) => {
        this.projects = projects;
        this.projectstmp = projects;
        projects.map(({ techStack }) =>
          techStack.map((tech) => {
            let test = this.tags.find((tag) => tag.name === tech.name);
            if (!test) this.tags.push({ ...tech, isSelected: false });
          })
        );
      });
    }
  }
}
