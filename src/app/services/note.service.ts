import { Injectable } from '@angular/core';
import { NoteFile } from '../models/note-file.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: NoteFile[] = [];
  public currentSelectedNote: NoteFile[] = [];
  constructor() { }

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
