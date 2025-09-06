import { Component } from '@angular/core';
import { Router,RouterOutlet,NavigationEnd } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { FileSystemComponent } from './file-system/file-system.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FrontPageComponent,FileSystemComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'emerald';


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Angular route:', event.urlAfterRedirects);
      }
    });
  }

}
