import { Component,Output, Input, EventEmitter } from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() toggleTree: any;
  @Output() toggleResult  = new EventEmitter<any>();

  constructor(private editorService: EditorService) {}

  onSwitch() {
    this.toggleTree = !this.toggleTree;
    this.toggleResult.emit(this.toggleTree);
    this.editorService.toggleElements(this.toggleTree);
  }

}
