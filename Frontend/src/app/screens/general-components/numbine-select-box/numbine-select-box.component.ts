import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SelectBoxItem } from '../../models/SelectBoxItem';

@Component({
  selector: 'app-numbine-select-box',
  templateUrl: './numbine-select-box.component.html',
  styleUrls: ['./numbine-select-box.component.scss']
})
export class NumbineSelectBoxComponent implements OnInit, OnChanges {
  @Input()
  disabled: boolean;
  @Input()
  data: SelectBoxItem[];
  @Input()
  title: String;
  @Input()
  id: number = 0;
  @Input()
  cssClass = "col-sm-12 col-xl-3 m-b-30";
  @Input()
  selected: number = 1;
  @Input()
  name = "select"
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectOption(this.id);
  }

  selectOption(id: number) {
    this.selected = id;
  }

  get selectedId(): number {
    return this.selected;
  }


}
