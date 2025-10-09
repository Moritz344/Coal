import { Component,HostListener,OnChanges,ViewChild,ElementRef,Input,SimpleChanges,OnDestroy } from '@angular/core';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';
import { provideMarkdown,MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditorService } from '../services/editor.service';
import { TabService } from '../services/tab.service';
import { EditorModule } from 'primeng/editor';
import { MessageModule } from 'primeng/message';

// TODO: change font/change font-size

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrl: './editor-view.component.css',
  providers: [provideMarkdown(),],
  imports: [FormsModule,HttpClientModule,CommonModule,MarkdownModule,EditorModule,MessageModule],
  standalone: true,
})



export class EditorViewComponent implements OnChanges,OnDestroy{

  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('editorText', { static: false }) editorText!: ElementRef;



  toggleWidth: boolean = false;
  note: any;
  noteName: any;
  noteContent: string = "";
  fontSize: number = 20;
  hideEditor: boolean = false;
  fileToHide: string = "";
  savedFile: boolean = true;


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

  updateEditorPos() {
      this.editorService.getToggleElement().subscribe(result => {
        if (this.editor && this.editorText) {
          if (!result) {
            const newPos = 50 + 'px';
            this.editor.nativeElement.style.left = newPos;
            this.editorText.nativeElement.style.width = 1800 + 'px';
          }else{
            const newPos = 350 + 'px';
            this.editor.nativeElement.style.left = newPos;
            this.editorText.nativeElement.style.width = 1400 + 'px';
          }
        }
      });

      this.editorService.getCurrentFileTreeWidth().subscribe(width => {
        if (this.editor) {
          if (width) {
              const newPos = (width + 50)  + 'px';
              this.editor.nativeElement.style.left = newPos;
            }
          }
      });
  }

  loadHideEditor() {
    this.editorService.getHideEditorValue().subscribe((result: any) => {
      this.hideEditor = result;
    });




  }

  loadNote() {
      this.editorService.getFiles().subscribe( result => {
        this.note = result;
        this.noteName = this.note.name;
        this.readingFile();

      });
      this.savedFile = true;

  }

  constructor(
              private fileService: FileService,
              public editorService: EditorService,
              public tabService: TabService
             ) {
               this.loadHideEditor();
               this.loadNote();
               this.updateEditorPos();

             }





  ngOnChanges(changes: SimpleChanges) {

    }

  ngOnDestroy() {
  }





  async saveCurrentFile(content: string) {
    let result = await this.fileService.saveFile(this.note.path,content);
    this.noteContent = content;
    //console.log("saved",result);
  }


  async readingFile() {
    if (!this.note.isDirectory ) {
      this.noteContent = await this.fileService.readFile(this.note.path);
      //console.log("content",this.noteContent);
    }


  }

  }


