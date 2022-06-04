import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PWAService } from '@shared/services/pwa.service';
import { SEOService } from '@shared/services/seo.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) private dom: Document,
    private renderer: Renderer2,
    private seoService: SEOService,
    private pwaService: PWAService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    if (isPlatformServer(platformId)) {
      this.seoService.setTitle();
      this.seoService.setMetaData();
      this.seoService.setJsonLd(this.renderer);
      this.pwaService.setPWAData();
    }

    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const messageNoJS = $localize`:@@appMessageNoJS:Please enable JavaScript to continue using this application.`;
    const p: HTMLParagraphElement = this.renderer.createElement('p');
    p.innerHTML = messageNoJS;
    const div: HTMLDivElement = this.renderer.createElement('div');
    div.id = 'no-js';
    this.renderer.appendChild(div, p);

    this.renderer.appendChild(this.dom.body.getElementsByTagName('noscript')[0], div);

    if (this.isBrowser) {
      const message = $localize`:@@appMessageConsoleHaveFun:✨ Have a great day and have fun! ✨`;
      const quote = $localize`:@@appMessageConsoleQuote:"Whenever possible, steal code" ~ Tom Duff`;
      const styles = `background-color: #fff; color: #000; border: 2px solid #000; text-align: center;`;
      console.log(`%c ${message}`, `${styles} font-weight: 400; font-size: 32px; padding: 16px;`);
      console.log(`%c ${quote}`, `${styles} font-weight: 200; font-size: 16px; padding: 8px;`);
    }
  }
}
