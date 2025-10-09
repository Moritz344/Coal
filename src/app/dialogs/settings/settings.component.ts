import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { GeneralComponent } from './general/general.component';
import { EditorComponent } from './editor/editor.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-settings',
  imports: [MatButtonModule,GeneralComponent,EditorComponent,AboutComponent],
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  settingsOption = "";

  constructor(private dialogRef: MatDialogRef<SettingsComponent>) {
    this.setOption("general");
  }

  setOption(type: string) {
    this.settingsOption = type;
    console.log(this.settingsOption);
  }

  close() {
    this.dialogRef.close();
  }


}
