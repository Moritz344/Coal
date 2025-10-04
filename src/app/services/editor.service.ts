import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  selectedFile: any = [];
  private fileToEdit = new BehaviorSubject<any>(this.selectedFile);

  toggle: boolean = false;
  toggleSubject = new BehaviorSubject<boolean>(this.toggle);

  fileTreeWidth: number = 0;
  fileTreeWidthSubject = new BehaviorSubject<number>(this.fileTreeWidth);

  addFile(note: any) {
    this.selectedFile = note;
    this.fileToEdit.next(this.selectedFile);
  }

  toggleElements(toggleWidth: boolean) {
    this.toggle = toggleWidth;
    this.toggleSubject.next(this.toggle);
  }

  getToggleElement() {
    return this.toggleSubject.asObservable();
  }

  saveCurrentFileTreeWidth(width: number) {
    this.fileTreeWidth = width;
    this.fileTreeWidthSubject.next(this.fileTreeWidth);
  }

  getCurrentFileTreeWidth() {
    return this.fileTreeWidthSubject.asObservable();
  }

  getFiles() {
    return this.fileToEdit.asObservable();
  }

}
