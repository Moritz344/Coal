import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  tabArray: any = [];

  private tabArraySubject = new BehaviorSubject<any>(this.tabArray);

  constructor() { }

  addTab(note: any) {
    this.tabArray.push(note);
    this.tabArraySubject.next(this.tabArray);
  }

  removeTabElement(name: string) {
    const index = this.tabArray.indexOf(name);
    this.tabArray.splice(index,1);
  }


  getTabArray() {
    return this.tabArraySubject.asObservable();
  }
}
