import { Component,Input,Output, EventEmitter, OnInit,SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO: get data for file

@Component({
  selector: 'app-context',
  imports: [FormsModule,CommonModule],
  templateUrl: './context.component.html',
  styleUrl: './context.component.css'
})
export class ContextComponent implements OnChanges {
  @Input() file: any;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Output() fileEmit = new EventEmitter<any>();

  contextAction: any;

  ngOnInit() {
    console.log("context e",this.file);
    this.contextAction = [{type:"rename",data: this.file}];

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['file'] && this.file) {
      console.log("file in ngOnChanges:", this.file);
      this.contextAction = [{ type: "rename", data: this.file }];
    }
  }

  onRename() {
    this.fileEmit.emit(this.contextAction);
  }


}
