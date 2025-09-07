import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { SettingsComponent } from '../settings.component';
import { NoteService } from '../../services/note.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-general',
  imports: [],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

  constructor(private fileService: FileService,private noteService: NoteService, private dialogRef: MatDialogRef<SettingsComponent>) {}

  async onBrowse() {
    let result = await this.fileService.openPath();

    this.noteService.setCurrentPath(result!.filePath);
    console.log(result);
    this.dialogRef.close();

  }


}
