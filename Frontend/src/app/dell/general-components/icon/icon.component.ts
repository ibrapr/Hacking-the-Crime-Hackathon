import { Component,Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  public type = "";

  @Input()
  public iconIndex : number;
  @Input()
  clickFunction : Function;
  constructor() { }

  ngOnInit(): void {
  }

  onClick()
  {
  }
}
