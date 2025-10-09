import { Component,Output,EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  standalone: true,
})
export class ConfirmDialogComponent {

  @Output() confirm = new EventEmitter<boolean>;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}


  onAccept() {
    this.confirm.emit(true);
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }
}
