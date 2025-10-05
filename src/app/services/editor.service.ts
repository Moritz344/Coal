import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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

  hideEditor: boolean = false;
  hideEditorSubject = new BehaviorSubject<boolean>(this.hideEditor);

  fileName: string = "";
  fileNameSubject = new BehaviorSubject<string>(this.fileName);

  addFile(note: any) {
    this.selectedFile = note;
    this.fileToEdit.next(this.selectedFile);
  }

  toggleElements(toggleWidth: boolean) {
    this.toggle = toggleWidth;
    this.toggleSubject.next(this.toggle);
  }

  setHideEditor(hide: boolean) {
    this.hideEditor = hide;
    this.hideEditorSubject.next(this.hideEditor);

  }

  getHideEditorValue() {
    return this.hideEditorSubject.asObservable();
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
