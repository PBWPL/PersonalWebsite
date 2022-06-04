import { DOCUMENT, Location } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  defaultTitle = $localize`:@@seoDefaultTitle:Peter Bec`;
  defaultDesc = $localize`:@@seoDefaultDesc:
  Peter Bec is a Fullstack Developer who improves his skills in a wide range of
  web development (Front-end, Back-end, DevOps). When he isn't coding,
  he listens to music, reads books, plays guitar or runs.`;
  keywords = 'Peter Bec, Fullstack Developer, Frontend Developer, Backend Developer, Coder';
  imageUrl = `${environment.url}/assets/headshot-pb.png`;
  googleAnalyticsID = 'G-TRDRPEWXVX';

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private title: Title,
    private meta: Meta,
    private location: Location
  ) {}

  setTitle(title?: string) {
    this.title.setTitle(title ? `${title} | ${this.defaultTitle}` : this.defaultTitle);
  }

  setDesc(desc?: string) {
    const meta = desc ? this.meta.updateTag : this.meta.addTag;
    meta({ name: 'description', content: desc || this.defaultDesc });
  }

  setJsonLd(renderer: Renderer2) {
    let script: HTMLScriptElement = renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": ${this.defaultTitle},
        "author": {
          "@type": "Person",
          "@id": "#piotrbec"
        },
        "image": ${this.imageUrl},
        "url": ${environment.url},
        "keywords": ${this.keywords}
      }`;
    renderer.appendChild(this.dom.head, script);
  }

  setGoogleAnalytics(renderer: Renderer2) {
    let scriptOne: HTMLScriptElement = renderer.createElement('script');
    scriptOne.src = `https://www.googletagmanager.com/gtag/js?id=${this.googleAnalyticsID}`;
    scriptOne.async = true;

    renderer.appendChild(this.dom.head, scriptOne);

    let scriptTwo: HTMLScriptElement = renderer.createElement('script');
    scriptTwo.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${this.googleAnalyticsID}');
      `;

    renderer.appendChild(this.dom.head, scriptTwo);
  }

  setCanonicalUrl(renderer: Renderer2) {
    let link: HTMLLinkElement = renderer.createElement('link');
    link.setAttribute('rel', 'canonical');
    renderer.appendChild(this.dom.head, link);
    link.setAttribute('href', this.dom.URL);
  }

  setAlternateUrl(renderer: Renderer2) {
    let languages = environment.languages;
    let fullPath = this.location.prepareExternalUrl(this.location.path());
    let basePath = fullPath.substring(0, fullPath.lastIndexOf(this.location.path().substring(1)));
    languages.forEach((language) => {
      let url = basePath.replace(/\/(..)\/$/g, '/' + language + '/') + this.location.path().substring(1);
      if (url !== fullPath) {
        this.addAlternateLink(renderer, url, language);
      } else if (fullPath === basePath && language !== basePath.replace(/\//g, '')) {
        this.addAlternateLink(renderer, '/' + language, language);
      }
    });
  }

  addAlternateLink(renderer: Renderer2, href: string, lang: string) {
    let link: HTMLLinkElement = renderer.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('title', this.title.getTitle());
    renderer.appendChild(this.dom.head, link);
    link.setAttribute('href', href);
    link.setAttribute('hreflang', lang);
  }

  setMetaData(config?: any) {
    let title = config?.title ? `${this.defaultTitle} | ${config.title}` : this.defaultTitle;
    let desc = config?.desc || this.defaultDesc;
    let image = config?.image || this.imageUrl;
    let keywords = config?.keywords || this.keywords;
    let url = config?.url || environment.url;

    this.meta.addTags([
      // Search Engine
      { name: 'description', content: desc },
      { name: 'keywords', content: keywords },
      { name: 'image', content: image },
      // COMMON TAGS
      { name: 'title', content: title },
      { name: 'author', content: this.defaultTitle },
      // Schema.org for Google
      { itemprop: 'name', content: title },
      { itemprop: 'description', content: desc },
      { itemprop: 'image', content: image },
      // Twitter
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:url', content: url },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: desc },
      { property: 'twitter:image', content: image },
      // Open Graph general (Facebook, Pinterest & Google+)
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: image }
    ]);
  }
}
