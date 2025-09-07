import { Component,Output, Input, EventEmitter } from '@angular/core';

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

  constructor() {}

  onSwitch() {
    this.toggleTree = !this.toggleTree;
    this.toggleResult.emit(this.toggleTree);
  }

}
