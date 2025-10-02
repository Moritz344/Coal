import { Component,Input } from '@angular/core';
import { TabService } from '../services/tab.service';
import { EditorViewComponent } from '../editor-view/editor-view.component';
import { EditorService } from '../services/editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [EditorViewComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input() name: string = "";
  @Input() node: any;

  selectedNode:any;
  toggleTree: boolean = false;


  constructor(private tabService: TabService,
             private editorService: EditorService,
             private router: Router) {
  }

  onTabClose() {
    this.tabService.removeTabElement(this.name);
    console.log("remove tab");
  }


  onTabOpen() {
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
