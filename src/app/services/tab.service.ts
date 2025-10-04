import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  tabArray: any = [];
  private tabArraySubject = new BehaviorSubject<any>(this.tabArray);

  currentFileTreeWidth: number = 0;
  currentFileTreeWidthSubject = new BehaviorSubject<number>(this.currentFileTreeWidth);

  currentFileTreeState: boolean = true;
  currentFileTreeStateSubject= new BehaviorSubject<boolean>(this.currentFileTreeState);

  constructor() { }

  addTab(note: any) {
    this.tabArray.push(note);
    this.tabArraySubject.next(this.tabArray);
  }

  saveCurrentFileTreeWidth(width: number) {
    this.currentFileTreeWidth = width;
    this.currentFileTreeWidthSubject.next(this.currentFileTreeWidth);
  }

  getCurrentFileTreeWidth() {
    return this.currentFileTreeWidthSubject.asObservable();
  }

  saveCurrentFileTreeState(state: boolean) {
    this.currentFileTreeState = state;
    this.currentFileTreeStateSubject.next(this.currentFileTreeState);
  }

  getCurrentFileTreeState() {
    return this.currentFileTreeStateSubject.asObservable();
  }

  removeTabElement(name: string) {
    for (let i=0;i<this.tabArray.length;i++) {
      if (this.tabArray[i].name === name) {
        const index = i;
        this.tabArray.splice(index,1);
      }
    }
  }


  getTabArray() {
    return this.tabArraySubject.asObservable();
  }
}
