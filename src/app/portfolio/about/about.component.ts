import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Developer } from '@shared/interfaces/developer';
import { DeveloperService } from '@shared/services/developer.service';
import { StyleManagerService } from '@shared/services/style-manager.service';
import { MatrixComponent } from './matrix/matrix.component';
import { SEOService } from '@shared/services/seo.service';

@Component({
  selector: 'portfolio-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isBrowser: boolean;

  developer: Developer = this.developerService.getDeveloper();

  isDark: BehaviorSubject<boolean> = this.styleManager.isDark;

  @ViewChild(MatrixComponent) matrix!: MatrixComponent;

  matrixSignType = Math.random() < 0.5 ? 'characters' : 'numbers';

  toggleMatrix(): void {
    this.matrix.toggleMatrix();
  }

  preventClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {}

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private styleManager: StyleManagerService,
    private developerService: DeveloperService,
    private renderer: Renderer2,
    private seoService: SEOService
  ) {
    this.seoService.setTitle($localize`:@@aboutTitle:About Me`);
    if (isPlatformServer(platformId)) {
      this.seoService.setCanonicalUrl(this.renderer);
      this.seoService.setAlternateUrl(this.renderer);
    }

    this.isBrowser = isPlatformBrowser(platformId);
  }
}
