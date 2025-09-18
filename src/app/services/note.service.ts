import { Injectable } from '@angular/core';
import { NoteFile } from '../models/note-file.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // TODO: use path from user instead of the same path

  private notes: NoteFile[] = [];
  public currentSelectedNote: NoteFile[] = [];

  private pathSubject = new BehaviorSubject<string>('');
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




}
