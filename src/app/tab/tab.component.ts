import { Component,Input,Output,EventEmitter,OnInit,ViewChild,ElementRef } from '@angular/core';
import { TabService } from '../services/tab.service';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { EditorService } from '../services/editor.service';
import { Router } from '@angular/router';
//
// TODO: if you close the tab that you are in close the file

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [EditorViewComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit{
  @ViewChild('tab') tab!: ElementRef;
  @Input() name: string = "";
  @Input() node: any;

  @Input() isSelected: boolean = false;
  @Output() selectedTab = new EventEmitter<string>();

  selectedNode:any;
  toggleTree: boolean = false;
  countSelected: number = 0;


  constructor(private tabService: TabService,
             private editorService: EditorService,
             private router: Router) {
  }

  onTabClose() {
    this.tabService.removeTabElement(this.name);
    console.log("remove this tab:",this.name);
  }

  ngOnInit() {
     if (this.name.length >= 15) {
       this.name = this.name.slice(0,15) + "...";
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

    console.log(this.isSelected);

  }

}
