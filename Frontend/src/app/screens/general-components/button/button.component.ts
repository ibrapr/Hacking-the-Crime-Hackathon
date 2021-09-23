import { Component, Input, OnInit } from '@angular/core';
import {ButtonClass} from 'src/app/demo/enums/myenum.enum'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
 
    // Primary = "btn btn-primary",
    // Secondary = "btn btn-secondary",
    // Success = "btn btn-success",
})
export class ButtonComponent implements OnInit {

  @Input()
  type = ButtonClass.Primary;
  @Input()
  styleX="";

  @Input() 
  public name: string = "";

  buttonClass = ButtonClass;


  @Input()
  public isDisabled: boolean = false;

  @Input()
  public buttonType: string = "submit";
    // private ngbTooltipType = 
  public myMap = new Map([
    [ButtonClass.Primary, buttonNgbTooltip.Primary],
    [ButtonClass.Secondary, buttonNgbTooltip.Secondary],
    [ButtonClass.Success, buttonNgbTooltip.Success],
    [ButtonClass.Danger, buttonNgbTooltip.Danger],
    [ButtonClass.Warning, buttonNgbTooltip.Warning],
    [ButtonClass.Info, buttonNgbTooltip.Info],
    [ButtonClass.Light, buttonNgbTooltip.Light],
    [ButtonClass.Dark, buttonNgbTooltip.Dark],
    [ButtonClass.InLinkfo, buttonNgbTooltip.InLinkfo]
  ]); 

  constructor() { }

  ngOnInit(): void {

  }
  

}
export enum buttonClass {
  Primary = "btn btn-primary",
  Secondary = "btn btn-secondary",
  Success = "btn btn-success",
  Danger = "btn btn-danger",
  Warning="btn btn-warning",
  Info="btn btn-info",
  Light="btn btn-light",
  Dark="btn btn-dark",
  InLinkfo="btn btn-link",
}

export enum buttonNgbTooltip {
  Primary = "btn-primary",
  Secondary = "btn-secondary",
  Success = "btn-success",
  Danger = "btn-danger",
  Warning="btn-warning",
  Info="btn-info",
  Light="btn-light",
  Dark="btn-dark",
  InLinkfo="btn-link",
}
