import { Component,Input } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { TreeNodeComponent} from '../tree-node/tree-node.component';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NoteFile } from '../models/note-file.model';

// TODO: pfad erweitern durch directory und datein in der dir anzeigen

@Component({
  selector: 'app-file-system',
  imports: [RouterModule,TreeNodeComponent,CommonModule],
  templateUrl: './file-system.component.html',
  styleUrl: './file-system.component.css'
})
export class FileSystemComponent {

  path = "/home/moritz/Dokumente/test";
  rawFiles: NoteFile[] = [];
  noteContent: any;
  tree: any;
  @Input() node: any;

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

    console.log("tree",tree);
    return tree;
}


  async loadTree(path: string) {
    this.rawFiles = await this.fileService.readDir(path);
    if (this.rawFiles.length >= 1) {
      console.log(this.rawFiles);
      this.tree = await this.buildTree(path);
      console.log(this.tree);
    }

  }

  async openNote() {
    const content = await this.fileService.openFile();
    if (content) {
      this.noteContent = content;
    }

  }



}


