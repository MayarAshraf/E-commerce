import { Component } from '@angular/core';
import { ColorService } from './service/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    const storedColor = localStorage.getItem('websiteColor');
    if (storedColor) {
      this.colorService.setWebsiteColor(storedColor);
    }
  }
}
