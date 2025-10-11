import { Component,OnChanges,Input,EventEmitter,Output,SimpleChanges,OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { NoteFile } from '../models/note-file.model';
import { FileService } from '../services/file.service';
import { EditorViewComponent } from '../editor-view/editor-view.component';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,EditorViewComponent],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css'
})
export class TreeNodeComponent implements OnChanges {
  @Input() node: any = null;
  @Input() action: any = null;
  @Output() nodeSelected = new EventEmitter<any>();
  @Input() isSelected: boolean = false;

  note: any;
  noteContent: any;
  noteDir: any;
  rawFiles: any = [];


  onlyFiles: string[] = [];
  path: string = "";
  isEditing: boolean = false;

  renameNode:any;
  nodeToDelete: any;
  displayName: string = "";


  async loadFiles() {
    this.rawFiles = await this.fileService.readDir(this.path);
  }

  loadChildrenLazy() {
    if (this.node.isDirectory) {
      this.fileService.loadChildren(this.node);
    }
  }

  async deleteFileFunc(path: string) {
      this.fileService.deleteFile(path);
  }

  constructor (private noteService: NoteService,public router: Router,private fileService: FileService) {
    this.loadFiles();

    this.path = this.noteService.getCurrentPath();


  }
  ngOnChanges(changes: SimpleChanges) {
    this.displayName = this.node.name;
    if (this.action?.[0].type === "rename" ) {
      this.renameNode = this.action;
    }


    if (this.displayName.length >= 15) {
      this.displayName = this.displayName.slice(0,15) + "...";
    }
  }




  get isRenamingNode(): boolean {
    return this.renameNode?.[0]?.type === "rename" && this.renameNode?.[0].data.path === this.node.path;
  }



  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
    this.renameNode = null;
  }

  updateNotePath(path: string) {
    this.node.path = path;

  }


  async onNameChange(name: string,oldPath: string) {
    let newPath = oldPath.split("/");
    newPath[newPath.length - 1] = name;
    const finalPath = newPath.join("/");

    this.fileService.renameFile(oldPath,finalPath);
    this.updateNotePath(finalPath);
    //console.log("Neuer dateiname",name,"mit pfad",finalPath,"alter pfad",oldPath);


  }


  saveCurrentSelectedNote(name: any,path: string) {
    if (!this.node.isDirectory) {
      this.noteService.currentSelectedNote = [{name: name,path: path,content: "", isDirectory: false}];
      this.nodeSelected.emit(this.node);
      this.isSelected = true;
    }

      this.loadChildrenLazy();
  }

}
