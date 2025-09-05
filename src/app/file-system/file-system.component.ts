import { Component,Input,HostListener,signal,ElementRef,ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { TreeNodeComponent} from '../tree-node/tree-node.component';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NoteFile } from '../models/note-file.model';
import { ContextComponent } from '../context/context.component';

// TODO: pfad selbst wählen
// TODO: button mit dem man ordner hinzufügen kann oder datein
// TODO: Nerdtree,vim status line

@Component({
  selector: 'app-file-system',
  imports: [RouterModule,TreeNodeComponent,CommonModule,EditorViewComponent,ContextComponent],
  templateUrl: './file-system.component.html',
  styleUrl: './file-system.component.css'
})
export class FileSystemComponent {

  path = "/home/moritz/Dokumente/test";
  rawFiles: NoteFile[] = [];
  noteContent: any;
  tree: any;
  pathValue: string = "";
  @Input() node: any;
  toggleTree = signal(true);
  selectedNode: any;

  hoverX = 0;
  hoverY = 0;
  showContextMenu = false;
  contextAction: any;


  private startX = 0;
  private startWidth = 0;

  @ViewChild('resizable') resizable!: ElementRef;
  @HostListener('window:keydown', ['$event'])

  initResize(event: MouseEvent) {
    if (!this.resizable) return;
    this.startX = event.clientX;
    this.startWidth = this.resizable.nativeElement.offsetWidth;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.stopResize);
  }

  onMouseMove = (event: MouseEvent) => {
    const newWidth = this.startWidth + (event.clientX - this.startX);
    this.resizable.nativeElement.style.width = newWidth + 'px';
  }

  stopResize = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.stopResize);
  }

  showContextCard(event: MouseEvent,node: any) {
      this.updateHoverPosition(event);
      this.showContextMenu = true;
      this.selectedNode = node;
      this.contextAction = null;
      console.log("selected",this.selectedNode);
  }

  hideHoverCard(event: MouseEvent) {
    this.showContextMenu = false;
    this.contextAction = null;
  }

  onContextAction(action: any) {
    this.contextAction = action;
    this.showContextMenu = false;
    console.log("on context action ",this.contextAction);
  }

  updateHoverPosition(event: MouseEvent) {
    this.hoverX = event.pageX;
    this.hoverY = event.pageY;
  }

  onNodeSelected(node: any) {
    this.selectedNode = node;
  }

  toggleFileTree(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "n") {
      this.toggleTree.update((v) => !v);

    }
  }

  onNameChange(name: string,path: string) {
    console.log(name,path);
  }

  toggleFileTreeButton() {
    this.toggleTree.update((v) => !v);
  }

  constructor(private noteService: NoteService,private fileService: FileService) {


    this.loadTree(this.path);


  }



  async buildTree(path: string): Promise<Object>{
    const files = await this.fileService.readDir(path);
    const tree = [];

    for (const file of files) {
      if (file.isDirectory) {
        tree.push({
          name: file.name,
          isDirectory: true,
          path: file.path,
          children: await this.buildTree(`${path}/${file.name}`)
        });
      } else {
        tree.push({
          name: file.name,
          path: file.path,
          isDirectory: false
        });
      }
    }

    //console.log("tree",tree);
    return tree;
}


  async loadTree(path: string) {
    this.rawFiles = await this.fileService.readDir(path);
    if (this.rawFiles.length >= 1) {
      //console.log(this.rawFiles);
      this.tree = await this.buildTree(path);
      console.log(this.tree);
    }

  }

  checkIfFileExists(name: string): boolean {
     var exists = false;
      for (const item of this.tree) {
        if (item.name === name) {
          exists = true;
        }
      }

      return exists;
  }

  async createFolder(name:string) {
    let result = await this.fileService.createFolder(this.path + "/" + name);
    console.log(result);

    let exists = this.checkIfFileExists(name);
    if (!exists) {
          this.tree.push({
            name: name,
            path: this.path + "/" + name,
            isDirectory: true
          });
          console.log(this.path);

    }else {
      alert("Directory with this name already exists");
    }
  }

  async createNote(name: string) {
    let result = await this.fileService.saveFile(this.path + "/" + name,"");
    console.log(result);
    let exists = this.checkIfFileExists(name);
      if (!exists) {
        console.log("file does not exist");
          this.tree.push({
            name: name,
            path: this.path + "/" + name,
            isDirectory: false
          });
      }else {
        alert("File with that name already exists");
      }

      console.log(name,this.path + "/" + name);
      console.log(this.tree);
  }



}


