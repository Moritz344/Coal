import { Component,Input } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { NoteFile } from '../models/note-file.model';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-tree-node',
  imports: [RouterModule,CommonModule,FormsModule],
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
  isEditing: boolean = false;

  constructor (private noteService: NoteService,public router: Router,private fileService: FileService) {}

  startEditing() {
    console.log("start editing");
    this.isEditing = true;
  }

  stopEditing() {
    console.log("stop editing");
    this.isEditing = false;
  }


  onNameChange(name: string,oldPath: string) {
    let newPath = oldPath.split("/");
    newPath[newPath.length - 1] = name;
    const finalPath = newPath.join("/");
    this.fileService.renameFile(oldPath,finalPath);
    console.log("Neuer dateiname",name,"mit pfad",finalPath);
  }

  saveCurrentSelectedNote(name: any,path: string) {
    let IsItemDirectory = this.findItemWithName(name);
    if (!IsItemDirectory) {
      this.noteService.currentSelectedNote = [{name: name,path: path,content: "", isDirectory: false}];
    }else{
      this.noteService.currentSelectedNote = [];
    }
    //console.log(this.noteService.currentSelectedNote);
    console.log("file name",name);
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
