import { Component,Input,HostListener,signal,ElementRef,ViewChild,Output,EventEmitter } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { TreeNodeComponent} from '../tree-node/tree-node.component';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { RouterModule,ActivatedRoute,Router} from '@angular/router';
import { CommonModule} from '@angular/common';
import { NoteFile } from '../models/note-file.model';
import { ContextComponent } from '../context/context.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FrontPageComponent } from '../front-page/front-page.component';
import { SettingsComponent } from '../settings/settings.component';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DragDropModule,CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop';
import { EditorService } from '../services/editor.service';
import { TabService } from '../services/tab.service';
import { ChangeDetectorRef } from '@angular/core';

// TODO: pfad selbst wählen
// TODO: button mit dem man ordner hinzufügen kann oder datein
// TODO: Nerdtree,vim status line
// TODO: when trying to open a video file -> ignore it


@Component({
  selector: 'app-file-system',
  standalone: true,
  imports: [
    RouterModule,
    TreeNodeComponent,
    CommonModule,EditorViewComponent,ContextComponent,SidebarComponent,SettingsComponent
  ,MatDialogModule,MatButtonModule,DragDropModule,FrontPageComponent],
  templateUrl: './file-system.component.html',
  styleUrl: './file-system.component.css'
})
export class FileSystemComponent {
  @Input() node: any;
  @Output() newWidthScale = new EventEmitter<number>;
  @Output() maxWidthScale = new EventEmitter<boolean>();

  path = "";
  rawFiles: NoteFile[] = [];
  noteContent: any;
  tree: any;
  pathValue: string = "";
  toggleTree = signal(true);
  selectedNode: any;
  selectedNodeName: string = "";

  hideFileSystem = false;

  hoverX = 0;
  hoverY = 0;
  showContextMenu = false;
  contextAction: any;

  countFileName = 0;


  private startX = 0;
  private startWidth = 0;

  @ViewChild('resizable') resizable!: ElementRef;
  @HostListener('window:keydown', ['$event'])

  drop(event: CdkDragDrop<any[]>) {
    if (!event.container?.data) {
      return;

    }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }


  initResize(event: MouseEvent) {
    if (!this.resizable) return;
    this.startX = event.clientX;
    this.startWidth = this.resizable.nativeElement.offsetWidth;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.stopResize);
  }

  onMouseMove = (event: MouseEvent) => {
    const newWidth = this.startWidth + (event.clientX - this.startX);
    if (newWidth <= 300 && newWidth >= 100) {
      this.resizable.nativeElement.style.width = newWidth + 'px';
      this.newWidthScale.emit(newWidth);
    }
  }

  onSettings() {
    this.dialog.open(SettingsComponent, {
      width: '500px',
      panelClass: 'container'
    });
  }

  onHome() {
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
  }

  hideHoverCard(event: MouseEvent) {
    this.showContextMenu = false;
    this.contextAction = null;
  }

  onContextAction(action: any) {
    this.contextAction = action;
    this.showContextMenu = false;

    if (this.contextAction && this.contextAction[0].type === "delete") {
      this.deleteFileOnContextAction();
    }
  }

  onSideBarAction(toggle: boolean) {
    this.toggleTree.update((toggle) => !toggle);
    this.maxWidthScale.emit(this.toggleTree());
    this.cdr.detectChanges();
    console.log(toggle);
  }

  deleteFileOnContextAction() {

      for (let i=0;i<this.tree.length;i++) {
        if (this.tree[i].path === this.contextAction[0].data.path) {
          this.tree.splice(i,1);
          this.fileService.deleteFile(this.contextAction[0].data.path);
        }

      }


  }

  updateHoverPosition(event: MouseEvent) {
    this.hoverX = event.pageX ;
    this.hoverY = event.pageY - 100;
  }

  onNodeSelected(node: any) {
    this.selectedNode = node;
    this.hideFileSystem = false;
    this.selectedNodeName = this.selectedNode.name;

    this.editorService.addFile(this.selectedNode);
    this.router.navigate(['/editor']);

    this.tabService.getTabArray().subscribe(result => {
        const flattenedResult = result.flat();
        const exists = flattenedResult.some((element: any) => element.name === this.selectedNode.name);


        if (!exists) {
          this.tabService.addTab(this.selectedNode);
        }



      });
  }

  toggleFileTree(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "n") {
      this.toggleTree.update((v) => !v);

    }
  }


  toggleFileTreeButton() {
    this.toggleTree.update((v) => !v);
  }

  constructor(public tabService: TabService,public router: Router,public route: ActivatedRoute,private noteService: NoteService,private fileService: FileService,private dialog: MatDialog,public editorService: EditorService,private cdr: ChangeDetectorRef) {


      this.noteService.currentPath$.subscribe(path => {
        if (!path) return;
        this.path = path;
        this.loadTree(this.path);
      });



  }



  async buildTreeService(path: string): Promise<NoteFile[]>{

    let resultTree = this.fileService.buildTree(path);

    return resultTree;

}

  async loadChildrenService(node: NoteFile): Promise<void> {
    this.fileService.loadChildren(node);
  }


  async loadTree(path: string) {
    this.rawFiles = await this.fileService.readDir(path);
    if (this.rawFiles.length >= 1) {
      this.tree = await this.buildTreeService(path);
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

    }
  }

  async createNote(name: string) {
    let result = await this.fileService.saveFile(this.path + "/" + name,"");
    this.countFileName += 1;
    console.log(result);
    let exists = this.checkIfFileExists(name);
      if (!exists) {
        console.log("file does not exist");
          this.tree.push({
            name: name,
            path: this.path + "/" + name,
            isDirectory: false
          });
      }

      console.log(name,this.path + "/" + name);
      console.log(this.tree);
  }



}


