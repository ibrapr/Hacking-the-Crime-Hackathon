import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectBoxItem } from '../../models/SelectBoxItem';

@Component({
  selector: 'app-numbine-auto-complete-select-box',
  templateUrl: './numbine-auto-complete-select-box.component.html',
  styleUrls: ['./numbine-auto-complete-select-box.component.scss']
})

/**
 * How to use?
 * In your component add this line =>  
 * <app-numbine-auto-complete-select-box  hintText="your hint text" [data]="enter your data as array of SelectBoxItem"></app-numbine-auto-complete-select-box> 
 */
export class NumbineAutoCompleteSelectBoxComponent implements OnInit {
  @Input()
  public disabled:boolean;
  @Input()
  public data: SelectBoxItem[];
  @Input()
  hintText: String
  public selectedItem: SelectBoxItem;
  slectedById: number;
  @Input()
  cssClass = "col-sm-12 col-xl-4";

  @Output()
  public onSelectionChanged: EventEmitter<number> = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit(): void {
  }

  resetSelected(){
    this.onSelectionChanged.emit(-1);
  }

  onChange = ($event: any): void => {
    this.selectedItem = this.data[this.slectedById]
    if (!!this.selectedItem)
      this.onSelectionChanged.emit(this.selectedItem.id);
  }

}
