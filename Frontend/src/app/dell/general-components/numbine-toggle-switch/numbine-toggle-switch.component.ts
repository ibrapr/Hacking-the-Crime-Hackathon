import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numbine-toggle-switch',
  templateUrl: './numbine-toggle-switch.component.html',
  styleUrls: ['./numbine-toggle-switch.component.scss']
})
/**
 * How to use?
 * In your component add the line below:
 *  <app-numbine-toggle-switch [id]="1" leftSide="left" rightSide="right"></app-numbine-toggle-switch>
 * 
 * Param ===>
 * leftSide  = "your left side text"
 * rightSide = "your right side text"
 * [id]      = " your identity"
 */
export class NumbineToggleSwitchComponent implements OnInit {
  @Input()
  leftSide: String;
  @Input()
  rightSide: String;
  @Input()
  id: any = "switch-p-1";

  @Output()
  public onSelectionChangedBooleanValue: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Output()
  public onSelectionChangedStringValue: EventEmitter<String> = new EventEmitter<String>();
  @Input()
  isChecked: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.onSelectionChangedBooleanValue.emit(this.isChecked);
  }
  onChanged(e) {
    this.isChecked = e.target.checked
    this.onSelectionChangedBooleanValue.emit(this.isChecked);
    this.getSelected();
  }

  getSelected(): void {

    if (!this.isChecked) {
      this.onSelectionChangedStringValue.emit(this.leftSide)
    }
    else {
      this.onSelectionChangedStringValue.emit(this.rightSide)
    }

  }
}
