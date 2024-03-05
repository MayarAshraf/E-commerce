import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private websiteColor: string = '#ffffff';
  constructor() { }
  getWebsiteColor(): string {
    return this.websiteColor;
  }
  setWebsiteColor(color: string): void {
    this.websiteColor = color;
    document.documentElement.style.setProperty('--website-color', color);
    localStorage.setItem('websiteColor', color);
  }
}
