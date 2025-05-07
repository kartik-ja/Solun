import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {
  // @Input() router!: Router;
  GoToHome()
  {
    this.router.navigate(["/"]);
  }
  GoToEverydayCollection() {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Everyday' }
    });
  }
  GoToClassicsCollection()
  {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Classic' }
    });
  }
  GoToElementsCollection()
  {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Elements' }
    });
  }
  GoToCart()
  {
    this.router.navigate(['/Cart']);
  }
  GoToProfile()
  {
    this.router.navigate(['/Profile']);
  }

  constructor(private router: Router)
  {
    // router.navigate(["/"]);
  }
}
