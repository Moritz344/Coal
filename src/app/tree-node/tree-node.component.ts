import { Component,OnChanges,Input,EventEmitter,Output,SimpleChanges } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { NoteFile } from '../models/note-file.model';
import { FileService } from '../services/file.service';
import { EditorViewComponent } from '../editor-view/editor-view.component';

@Component({
  selector: 'app-tree-node',
  imports: [RouterModule,CommonModule,FormsModule,EditorViewComponent],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css'
})
export class TreeNodeComponent implements OnChanges {
  @Input() node: any = null;
  @Input() action: any = null;
  @Output() nodeSelected = new EventEmitter<any>();

  note: any;
  noteContent: any;
  noteDir: any;
  rawFiles: any = [];

  onlyFiles: string[] = [];
  path: string = "/home/moritz/Dokumente/test";
  isEditing: boolean = false;

  renameNode:any;


  async loadFiles() {
    this.rawFiles = await this.fileService.readDir(this.path);
  }

  constructor (private noteService: NoteService,public router: Router,private fileService: FileService) {
    this.loadFiles();



  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.action  ) {
      this.renameNode = this.action;
      console.log(this.renameNode,);
    }
  }


  get isRenamingNode(): boolean {
  return this.renameNode?.[0]?.type === "rename" && this.renameNode?.[0]?.data.path === this.node.path;
}



  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
    this.renameNode = null;
  }


  async onNameChange(name: string,oldPath: string) {
    let newPath = oldPath.split("/");
    newPath[newPath.length - 1] = name;
    const finalPath = newPath.join("/");

    this.fileService.renameFile(oldPath,finalPath);
    console.log("Neuer dateiname",name,"mit pfad",finalPath,"alter pfad",oldPath);


  }

  saveCurrentSelectedNote(name: any,path: string) {
    console.log("current",name,path);
    let IsItemDirectory = this.findItemWithName(name);
    if (!IsItemDirectory) {
      this.noteService.currentSelectedNote = [{name: name,path: path,content: "", isDirectory: false}];
      this.nodeSelected.emit(this.node);
    }
      console.log(this.noteService.currentSelectedNote);
      console.log(IsItemDirectory);
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
