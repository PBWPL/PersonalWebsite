import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {
  public isDark = new BehaviorSubject<boolean>(false);

  constructor(private overlayContainer: OverlayContainer) {}

  toggleDarkTheme() {
    this.isDark.getValue() ? this.removeDarkTheme() : this.setDarkTheme();
  }

  setDarkTheme() {
    const href = 'dark-theme.css';
    getLinkElementForKey('dark').setAttribute('href', href);
    document.body.classList.add('dark');
    this.overlayContainer.getContainerElement().classList.add('dark');
    this.isDark.next(true);
  }

  removeDarkTheme() {
    this.removeStyle('dark');
    document.body.classList.remove('dark');
    this.overlayContainer.getContainerElement().classList.remove('dark');
    this.isDark.next(false);
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `${key}-theme`;
}
