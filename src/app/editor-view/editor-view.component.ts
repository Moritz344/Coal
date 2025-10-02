import { Component,HostListener,OnChanges,ViewChild,ElementRef,Input,SimpleChanges,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';
import { NoteFile } from '../models/note-file.model';
import { provideMarkdown,MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditorService } from '../services/editor.service';



// TODO: change font/change font-size

@Component({
  selector: 'app-editor-view',
  imports: [FormsModule,HttpClientModule,CommonModule,MarkdownModule,],
  providers: [provideMarkdown(),],
  standalone: true,
  templateUrl: './editor-view.component.html',
  styleUrl: './editor-view.component.css'
})



export class EditorViewComponent implements OnChanges{


  toggleWidth: boolean = false;
  note: any;
  noteName: any;
  noteContent: string = "";
  showMarkdown = false;
  fontSize: number = 20;


  @HostListener("window:keydown",['$event'])
  handleKeyboardInputs(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (event.ctrlKey && key === '+') {
      this.increaseFontSize();
      event.preventDefault();
    }else if (event.ctrlKey && key === '-') {
      this.decreaseFontSize();
      event.preventDefault();
    }
  }

  increaseFontSize() {
    if (this.fontSize < 50) {
      this.fontSize += 5;
      const textArea = document.getElementById("editor") as HTMLTextAreaElement;
      if (textArea) {
        textArea.style.fontSize = `${this.fontSize}px`;
      }
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 10) {
      this.fontSize -= 5;
      const textArea = document.getElementById("editor") as HTMLTextAreaElement;
      if (textArea) {
        textArea.style.fontSize = `${this.fontSize}px`;
      }
    }
  }

  loadNote() {
      this.editorService.getFiles().subscribe( result => {
        this.note = result;
        this.noteName = this.note.name;
        this.readingFile();

        console.log("editor",this.note);
        console.log("ON EDITOR",this.noteName);
      });

  }

  constructor(
              private fileService: FileService,
              public editorService: EditorService
             ) {
               this.loadNote();

             }





  ngOnChanges(changes: SimpleChanges) {
    }


  onPreview() {
    this.showMarkdown = !this.showMarkdown;
  }



  async saveCurrentFile(content: string) {
    let result = await this.fileService.saveFile(this.note.path,content);
    this.noteContent = content;
    console.log("saved",result);
  }


  async readingFile() {
    if (!this.note.isDirectory ) {
      this.noteContent = await this.fileService.readFile(this.note.path);
      console.log("content",this.noteContent);
    }


  }

  }


