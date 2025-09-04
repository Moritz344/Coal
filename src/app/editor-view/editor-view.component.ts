import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { marked } from 'marked';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-view',
  imports: [FormsModule],
  templateUrl: './editor-view.component.html',
  styleUrl: './editor-view.component.css'
})
export class EditorViewComponent implements OnInit {

  note: any;
  noteName: any;
  noteContent: string = "";
  renderedMarkdown: string = "";


  constructor(private noteService: NoteService,
              private fileService: FileService,
             private route: ActivatedRoute) {}


  ngOnInit():void {
      this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.note = this.noteService.getCurrentSelectedNote();
        if (this.note.length >= 1) {
          this.noteName = this.note?.[0].name;
          console.log("single note",this.noteContent);

        }
          // reading file in currentSelected mitschicken
          this.readingFile();
      }
    });



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


