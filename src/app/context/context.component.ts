import { Component,Input,Output, EventEmitter, OnInit,SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO: get data for file

@Component({
  selector: 'app-context',
  imports: [FormsModule,CommonModule,],
  standalone: true,
  templateUrl: './context.component.html',
  styleUrl: './context.component.css',
  providers: []
})
export class ContextComponent implements OnChanges {
  @Input() file: any;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Output() fileEmit = new EventEmitter<any>();

  contextAction: any;

  constructor() {}

  ngOnInit() {
    this.contextAction = [{type:"rename",data: this.file}];

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['file'] && this.file) {
      this.contextAction = [{ type: "rename", data: this.file }];
    }
  }

  onRename() {
    this.fileEmit.emit(this.contextAction);
  }

  onDelete() {
    this.contextAction = [{type: "delete",data: this.file }];
    this.fileEmit.emit(this.contextAction);

  }
  onClose() {
    this.contextAction = [{type: "close",data: ""}];
    this.fileEmit.emit(this.contextAction);
  }

}
