import { Component,OnChanges,ViewChild,ElementRef,Input,SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { marked } from 'marked';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-view',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './editor-view.component.html',
  styleUrl: './editor-view.component.css'
})
export class EditorViewComponent implements OnChanges {

  @Input() node: any;
  @Input() toggleWidth: any;

  note: any;
  noteName: any;
  noteContent: string = "";
  renderedMarkdown: string = "";


  constructor(private noteService: NoteService,
              private fileService: FileService,
             private route: ActivatedRoute) {


             }


  ngOnChanges(changes: SimpleChanges) {
      this.note = [this.node];
      this.noteName = this.node.name;
      this.readingFile();

      console.log(this.note);
  }



  async saveCurrentFile() {
    let result = await this.fileService.saveFile(this.note[0].path,this.noteContent);
    console.log("saved file",result);
    console.log(this.noteContent);
  }


  async readingFile() {
    if (!this.note[0].isDirectory) {
      this.noteContent = await this.fileService.readFile(this.note[0].path);
      console.log("content",this.noteContent);
    }


  }

  }


