import { Component,Input,Output,EventEmitter,OnInit,ViewChild,ElementRef } from '@angular/core';
import { TabService } from '../services/tab.service';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { EditorService } from '../services/editor.service';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../services/note.service';

// TODO: if you close the tab that you are in close the file

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [EditorViewComponent,FormsModule,CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit{
  @ViewChild('tab') tab!: ElementRef;
  @Input() name: string = "";
  @Input() node: any;
  @Input() isLast: boolean = false;

  @Input() isSelected: boolean = false;
  @Output() selectedTab = new EventEmitter<string>();

  selectedNode:any;
  toggleTree: boolean = false;
  countSelected: number = 0;
  displayName: string = "";


  constructor(private tabService: TabService,
             private editorService: EditorService,
             private router: Router,
             private noteService: NoteService,
             private fileService: FileService,
             ) {

  }

  onTabClose() {
      this.tabService.removeTabElement(this.name);

      this.tabService.getTabArray().subscribe(result  => {
       if (result.length === 0) {
         this.editorService.setHideEditor(true);
       }
     });

  }

  async createNewNote(path: string,name: string = "New.txt") {
    return await this.fileService.saveFile(path + "/" + name,"");
  }

  onTabAdd() {
    // create new file
    let result = this.fileService.getTreeItems();
    for (let i=0;i<result.length;i++) {
      if (result[i].name === "New.txt") {
        return;
      }
    }

    let path = this.noteService.getCurrentPath();
    this.createNewNote(path);
    this.tabService.addTab({content: "",isDirectory:false,name:"New.txt",path: path + "New.txt"});
    this.tabService.getTabArray().subscribe(result => {
      console.log(result);
    });

    this.fileService.addFileToTree({content: "",isDirectory:false,name:"New.txt",path: path + "New.txt"})
  }


  ngOnInit() {
    this.displayName = this.name;
     if (this.displayName.length >= 15) {
       this.displayName = this.displayName.slice(0,15) + "...";
     }

  }



  updateTabPosition() {
    this.tabService.getCurrentFileTreeWidth().subscribe( result => {
      if (this.tab) {
        if (result >= 300) {
          this.tab.nativeElement.style.marginLeft = (result )  + 'px';
        }
      }
    });

    }

  onTabOpen() {
    this.selectedTab.emit(this.name);
    const flattenedResult = this.node.flat();
    for (let i=0;i<flattenedResult.length;i++) {
      if (flattenedResult[i].name === this.name) {
        this.selectedNode = flattenedResult[i];
        this.editorService.addFile(this.selectedNode);
        this.router.navigate(['editor']);
      }
    }


  }

}
