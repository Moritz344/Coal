import { Component,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NoteService } from '../services/note.service';
import { NoteFile } from '../models/note-file.model';

@Component({
  selector: 'app-tree-node',
  imports: [RouterModule,CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css'
})
export class TreeNodeComponent {
  @Input() node: any;

  note: any;
  noteContent: any;
  noteDir: any;
  rawFiles: NoteFile[] = [];
  onlyFiles: string[] = [];
  path: string = "/home/moritz/Dokumente";

  constructor (private noteService: NoteService) {}

  saveCurrentSelectedNote(name: string,path: string) {
    let IsItemDirectory = this.findItemWithName(name);
    if (!IsItemDirectory) {
      this.noteService.currentSelectedNote = [{name: name,path: path,content: "", isDirectory: false}];
    }else{
      this.noteService.currentSelectedNote = [];
    }
    console.log(this.noteService.currentSelectedNote);
  }

  findItemWithName(name: string): boolean {
    for (let i=0;i<this.rawFiles.length;i++) {
      if (this.rawFiles[i].name.includes(name)) {
          if (this.rawFiles[i].isDirectory) {
            return this.rawFiles[i].isDirectory;
          }
      }

    }
    return false;
  }
}
