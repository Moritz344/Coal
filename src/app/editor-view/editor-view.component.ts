import { Component,HostListener,OnChanges,ViewChild,ElementRef,Input,SimpleChanges,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';
import { NoteFile } from '../models/note-file.model';
import { provideMarkdown,MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// TODO: change font/change font-size

@Component({
  selector: 'app-editor-view',
  imports: [FormsModule,HttpClientModule,CommonModule,MarkdownModule,],
  providers: [provideMarkdown(),],
  standalone: true,
  templateUrl: './editor-view.component.html',
  styleUrl: './editor-view.component.css'
})



export class EditorViewComponent implements AfterViewInit,OnChanges{
  @ViewChild('editor') editor?: ElementRef;
  @Input() node: any;
  @Input() toggleWidth?: any;

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

  constructor(private noteService: NoteService,
              private fileService: FileService,
              private route: ActivatedRoute,
             ) {

             }

    ngAfterViewInit() {
     }


  ngOnChanges(changes: SimpleChanges) {
      this.note = [this.node];
      this.noteName = this.node.name;
      this.readingFile();

      console.log("editor",this.note);


  }

  onPreview() {
    this.showMarkdown = !this.showMarkdown;
  }



  async saveCurrentFile() {
    let result = await this.fileService.saveFile(this.note[0].path,this.noteContent);
    console.log("saved file",result);
    console.log(this.noteContent);
  }


  async readingFile() {
    if (!this.note[0].isDirectory ) {
      this.noteContent = await this.fileService.readFile(this.note[0].path);
      console.log("content",this.noteContent);
    }


  }

  }


