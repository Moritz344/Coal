import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  selectedFile: any = [];
  private fileToEdit = new BehaviorSubject<any>(this.selectedFile);

  addFile(note: any) {
    this.selectedFile = note;
    this.fileToEdit.next(this.selectedFile);
    console.log("added ",note);
  }


  getFiles() {
    return this.fileToEdit.asObservable();
  }

}
