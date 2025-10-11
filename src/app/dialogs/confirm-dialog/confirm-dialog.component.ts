import { Component,Output,EventEmitter,Input,Inject,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule,FormsModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  standalone: true,
})
export class ConfirmDialogComponent implements OnInit {

  @Output() confirm = new EventEmitter<boolean>;
  @Output() createFileName = new EventEmitter<string>;
  create: boolean = false;
  createFileString: string = "";

  constructor(private dialogRef:
              MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private file: FileService) {}

  ngOnInit() {
  }

  onFileCreate() {
    this.createFileName.emit(this.createFileString);
    this.dialogRef.close();

  }

  onAccept() {
    this.confirm.emit(true);
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }
}
