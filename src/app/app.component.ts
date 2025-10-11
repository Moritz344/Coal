import { Component, OnInit} from '@angular/core';
import { Router,RouterOutlet,NavigationEnd } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { FileSystemComponent } from './file-system/file-system.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FileService } from './services/file.service';
import { NoteService } from './services/note.service';
import { TabSystemComponent } from './tab-system/tab-system.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// TODO: make it responsive


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FrontPageComponent,FileSystemComponent,SidebarComponent,TabSystemComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'coal';
  selectedTree: any;
  showFrontPage = true;
  fileSystemWidth = 300;
  fileSystemMaxWidth = true;
  showHome = true;



  constructor(private router: Router, private fileService: FileService, private noteService: NoteService,) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Angular route:', event.urlAfterRedirects);
      }
    });
  }




  ngOnInit() {
    this.fileService.getDefaultPath().then(defaultPath => {
      this.noteService.setCurrentPath(defaultPath);
      console.log(defaultPath);

    });
    this.router.navigate(["/home"]);
  }

  onNewWidth(width: number) {
    this.fileSystemWidth = width;
    this.showHome = false;
  }

  onMaxWidth(isMax: boolean) {
    this.fileSystemMaxWidth = isMax;
  }

}
