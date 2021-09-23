import { Output } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SelectBoxItem } from '../../models/SelectBoxItem';

@Component({
  selector: 'app-select-tuple',
  templateUrl: './select-tuple.component.html',
  styleUrls: ['./select-tuple.component.scss']
})
export class SelectTupleComponent implements OnInit {
  
 

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
  inputModel: string;
  @Input()
  styleX :string="";

  @Output()
  inputModelChange = new EventEmitter<string>();

  @Input()
  holder:string = " ";
  @Input()
  public classType = "col-md-2";
  public st:string="2";
  ngOnInit(): void {
    if(this.st!="2")
    this.st=this.inputModel+"";
  }

}