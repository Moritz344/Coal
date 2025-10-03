import { Component, OnInit,Input, OnChanges,ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabService } from '../services/tab.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-system',
  standalone: true,
  imports: [TabComponent,FormsModule,CommonModule],
  templateUrl: './tab-system.component.html',
  styleUrl: './tab-system.component.css'
})
export class TabSystemComponent implements OnInit,OnChanges,AfterViewInit {

  @ViewChild('container') container!: ElementRef;
  @Input() fileSystemWidth: number = 300;
  @Input() fileSystemMaxWidth: boolean = false;

  selectedTabName = "";
  tabs: any = [];
  test: any;
  selectedNode: any;

  constructor(private tabService: TabService) {}


  ngOnInit() {
    this.tabService.getTabArray().subscribe(result => {
      this.tabs = result;
    });

    this.updateTabWidth();
  }



  ngOnChanges() {
    this.updateTabWidth();
  }

  ngAfterViewInit() {}

  updateTabWidth() {
    if (this.container) {
      const newPos = this.fileSystemWidth + 'px';
      this.container.nativeElement.style.left = newPos;

      if (!this.fileSystemMaxWidth ) {
        this.container.nativeElement.style.left = 0 + 'px';
      }else {
        this.container.nativeElement.style.left = 390 + 'px';
      }
    }



  }

  onTabSelect(name: string) {
    this.selectedTabName = name;
    //console.log("tab name?",this.selectedTabName);
  }

}
