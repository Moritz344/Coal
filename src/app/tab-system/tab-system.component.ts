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
  @Input() fileSystemWidth: number = 390;
  @Input() fileSystemMaxWidth: boolean = false;

  selectedTabName = "";
  tabs: any = [];
  test: any;
  selectedNode: any;
  last = true;
  showTabSystem = true;
  previous: any;

  constructor(private tabService: TabService) {}


  ngOnInit() {
    this.tabService.getTabArray().subscribe(result => {
      this.tabs = result;
    });



    this.updateTabWidth();
  }



  ngOnChanges() {
    let width = this.updateTabWidth();
    this.previous = width;

    this.tabService.getTabArray().subscribe( result => {
      if (result.length === 0) {
        this.showTabSystem = false;
      }else {
        this.showTabSystem = true;
      }
    });


  }

  ngAfterViewInit() {}

  updateTabWidth() {
    // open: container left = 390px
    // closed: container left = 51px
    // i dont know how many times i will comeback here i fucking hate this tabbar
    if (this.container) {
      const newPos = this.fileSystemWidth + 45 + 'px';
      this.container.nativeElement.style.left = newPos;


      if (!this.fileSystemMaxWidth ) {
        this.container.nativeElement.style.left = 49 + 'px';
      }

      if(this.fileSystemMaxWidth) {
        if (newPos === "300px" ) {
          this.container.nativeElement.style.left = 300 + 'px';
        }
      }

    }




  }

  onTabSelect(name: string) {
    this.selectedTabName = name;
    //console.log("tab name?",this.selectedTabName);
  }

}
