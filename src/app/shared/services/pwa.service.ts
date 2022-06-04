import { DOCUMENT, Location } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PWAService {
  constructor(private meta: Meta, @Inject(DOCUMENT) private dom: Document) {}

  addComment(text: string) {
    const test: Comment = this.dom.createComment(text);
    this.dom.head.appendChild(test);
  }

  addLinks(links: any[]) {
    links.forEach((l) => {
      let link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', l.rel);
      this.dom.head.appendChild(link);
      link.setAttribute('href', l.href);
      if (l.media) link.setAttribute('media', l.media);
      if (l.sizes) link.setAttribute('sizes', l.sizes);
      if (l.type) link.setAttribute('type', l.type);
    });
  }

  setPWAData() {
    this.addComment('Windows');
    this.meta.addTags([
      { content: 'IE=edge', httpEquiv: 'X-UA-Compatible' },
      { content: 'browserconfig.xml', name: 'msapplication-config' }
    ]);

    this.addComment('Safari');
    this.addLinks([{ color: '#fafafa', rel: 'mask-icon', href: 'assets/favicon.svg' }]);

    this.addComment('Android');
    this.meta.addTags([
      { content: '#fafafa', name: 'theme-color' },
      { content: 'yes', name: 'mobile-web-app-capable' },
      { content: 'PB 👋', name: 'application-name' }
    ]);
    this.addLinks([
      { href: 'assets/icons/icon-16x16.png', rel: 'icon', sizes: '16x16', type: 'image/png' },
      { href: 'assets/icons/icon-32x32.png', rel: 'icon', sizes: '32x32', type: 'image/png' }
    ]);

    this.addComment('iOS');
    this.meta.addTags([
      { content: 'yes', name: 'apple-touch-fullscreen' },
      { content: 'yes', name: 'apple-mobile-web-app-capable' },
      { content: 'PB 👋', name: 'apple-mobile-web-app-title' },
      { content: 'default', name: 'apple-mobile-web-app-status-bar-style' }
    ]);
    this.addLinks([
      { href: 'assets/icons/icon-16x16.png', rel: 'icon', sizes: '16x16', type: 'image/png' },
      { href: 'assets/icons/icon-32x32.png', rel: 'icon', sizes: '32x32', type: 'image/png' }
    ]);
    this.addLinks([{ href: 'assets/icons/apple-icon-180x180.png', rel: 'apple-touch-icon' }]);

    this.addComment('Splash Screens');
    this.addLinks([
      // iPhone 12 Pro Max, iPhone 13 Pro Max | 428x926pt (1284x2778px @3x)
      {
        href: 'assets/splashscreens/iphone-1284x2778.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-2778x1284.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1284x2778.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-2778x1284.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 12, iPhone 12 Pro, iPhone 13, iPhone 13 Pro | 390x844pt (1170x2532px @3x)
      {
        href: 'assets/splashscreens/iphone-1170x2532.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-2532x1170.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1170x2532.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-2532x1170.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone X, iPhone XS, iPhone 11 Pro, iPhone 12 mini, iPhone 13 mini | 375x812pt (1125x2436px @3x)
      {
        href: 'assets/splashscreens/iphone-1125x2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-2436x1125.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1125x2436.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-2436x1125.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 11 Pro Max, iPhone XS Max | 414x896pt (1242x2688px @3x)
      {
        href: 'assets/splashscreens/iphone-1242x2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-2688x1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1242x2688.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-2688x1242.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 11, iPhone XR | 414x896pt (828x1792px @2x)
      {
        href: 'assets/splashscreens/iphone-828x1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-1792x828.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-828x1792.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1792x828.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 6 Plus, iPhone 6S Plus, iPhone 7 Plus, iPhone 8 Plus | 414x736pt (1242x2208px @3x)
      {
        href: 'assets/splashscreens/iphone-1242x2208.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-2208x1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1242x2208.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-2208x1242.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 6, iPhone 6S, iPhone 7, iPhone 8, iPhone SE2 | 375x667pt (750x1334px @2x)
      {
        href: 'assets/splashscreens/iphone-750x1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-1334x750.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-750x1334.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1334x750.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 5, iPhone 5S, iPhone 5C, iPhone SE | 320x568pt (640x1136px @2x)
      {
        href: 'assets/splashscreens/iphone-640x1136.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-1136x640.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-640x1136.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-1136x640.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPhone 4, iPhone 4S | 320x480pt (640x960px @2x)
      {
        href: 'assets/splashscreens/iphone-640x960.jpg',
        media:
          '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-960x640.jpg',
        media:
          '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-640x960.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/iphone-dark-960x640.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad Air 10.9" | 820x1180pt (1640x2360px @2x)
      {
        href: 'assets/splashscreens/ipad-1640x2360.jpg',
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2360x1640.jpg',
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1640x2360.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2360x1640.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad 10.2" | 810x1080pt (1620x2160px @2x)
      {
        href: 'assets/splashscreens/ipad-1640x2360.jpg',
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2360x1640.jpg',
        media:
          '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1640x2360.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2360x1640.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad Pro 12.9" | 1024x1366pt (2048x2732px @2x)
      {
        href: 'assets/splashscreens/ipad-1620x2160.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2160x1620.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1620x2160.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2160x1620.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad Pro 11" | 834x1194pt (1668x2388px @2x)
      {
        href: 'assets/splashscreens/ipad-2048x2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2732x2048.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2048x2732.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2732x2048.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad mini" | 768x1024pt (1536x2048px @2x)
      {
        href: 'assets/splashscreens/ipad-1668x2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2388x1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1668x2388.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2388x1668.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad Pro 10.5" | 834x1112pt (1668x2224px @2x)
      {
        href: 'assets/splashscreens/ipad-1536x2048.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2048x1536.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1536x2048.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2048x1536.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      // iPad Pro 10.5" | 834x1112pt (1668x2224px @2x)
      {
        href: 'assets/splashscreens/ipad-1668x2224.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-2224x1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-1668x2224.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: 'assets/splashscreens/ipad-dark-2224x1668.jpg',
        media:
          '(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
        rel: 'apple-touch-startup-image'
      }
    ]);
  }
}
