import { Component, OnInit} from '@angular/core';
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
export class TabSystemComponent implements OnInit {

  tabs: any = [];
  test: any;
  selectedNode: any;

  constructor(private tabService: TabService) {}


  ngOnInit() {
    this.tabService.getTabArray().subscribe(result => {
      this.tabs = result;
      console.log("tab array", this.tabs);
    });
  }


}
