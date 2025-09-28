import { Component, OnInit, Input} from '@angular/core';
import { FileService } from '../services/file.service';
import { NoteService } from '../services/note.service';
import { NoteBlockComponent } from '../note-block/note-block.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [NoteBlockComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})

// TODO: hide front-page

export class FrontPageComponent implements OnInit {

  tree: any;
  path: string = "";

  constructor(private fileService: FileService, private noteService: NoteService) {}

  ngOnInit() {
    setTimeout( () => {
      this.path = this.noteService.getCurrentPath();
    },50);

    setTimeout( () => {
      this.fileService.buildTree(this.path).then( tree =>  {
          this.tree = tree;
          console.log(this.tree);
      });
    },100)

  }

}
