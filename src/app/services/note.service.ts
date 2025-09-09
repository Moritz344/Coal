import { Injectable } from '@angular/core';
import { NoteFile } from '../models/note-file.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: NoteFile[] = [];
  public currentSelectedNote: NoteFile[] = [];

  private pathSubject = new BehaviorSubject<string>('/home/moritz/Dokumente/test');
  currentPath$ = this.pathSubject.asObservable();


  constructor() { }


  setCurrentPath(path: string){
    this.pathSubject.next(path);
    console.log(path);
  }

  getCurrentPath(): string {
    return this.pathSubject.value;
  }

  getCurrentSelectedNote() {

    return this.currentSelectedNote;

  }

  addNote(note: NoteFile) {
    this.notes.push(note);
  }

  getNotes(): NoteFile[] {

    return this.notes;

  }

  async buildTree(tree: NoteFile[],files: NoteFile[],path: string): Promise<NoteFile[]>{

    for (const file of files) {
      if (file.isDirectory) {
        tree.push({
          name: file.name,
          isDirectory: true,
          path: file.path,
          children: null,
        });
      } else {
        tree.push({
          name: file.name,
          path: file.path,
          isDirectory: false,
        });
      }
    }

    return tree;
}



}
