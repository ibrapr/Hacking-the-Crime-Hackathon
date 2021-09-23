import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }
@Input()
public readonly:boolean;
  @Input()
  public type = "text";
  @Input()
  public max: number;
  @Input()
  public min: number;

  @Input()
  inputModel: string="";
  @Input()
  styleX :string="";

  @Output()
  inputModelChange = new EventEmitter<string>();

  @Input()
  holder:string = " ";
  @Input()
  public classType = "col-md-2";

  @Input()
  public formControlClass = "form-control";

  ngOnInit(): void {
  }

}
