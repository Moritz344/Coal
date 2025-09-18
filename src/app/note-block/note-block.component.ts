import { Component,Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { FileService } from '../services/file.service';
import { NoteFile } from '../models/note-file.model';

@Component({
  selector: 'app-note-block',
  standalone: true,
  imports: [RouterModule,EditorViewComponent],
  templateUrl: './note-block.component.html',
  styleUrl: './note-block.component.css'
})
export class NoteBlockComponent {
  @Input() data: NoteFile[] = [];
  isNote: boolean = false;

  selectedNote: any;


  constructor(private fileService: FileService) {
  }


  onNote(item: any) {
    this.selectedNote = item;
    this.isNote = true;
    console.log(item);
  }

}
