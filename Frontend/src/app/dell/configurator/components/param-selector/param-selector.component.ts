// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Parameter } from 'src/app/dell/models/Parameter'
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { DataService } from '../../../services/DataService/data.service';
import { ParameterService } from '../../../services/ParameterService/parameter.service';

@Component({
  selector: 'app-param-selector',
  templateUrl: './param-selector.component.html',
  styleUrls: ['./param-selector.component.scss']
})
export class ParamSelectorComponent implements OnInit, OnChanges, OnDestroy
{
  @Input()
  public labelText: string = "";
  @Input()
  public parameterList: Parameter[];

  public selectBoxItems: SelectBoxItem[];

  selectedParameter: Parameter;
  parameterSubscription: Subscription;
  hintText: String = "Select Parameter";
  defaultHintText: String = "Select Parameter";

  @Output()
  public onSelectionChanged: EventEmitter<Parameter> = new EventEmitter<Parameter>();

  constructor(private parameterService: ParameterService, private dataService: DataService) { }

  ngOnInit(): void
  {
    // Get all parameters
    let obs = this.parameterService.getAllParameters();
    obs.subscribe(parameters =>
    {
      this.parameterList = parameters;
      this.updateSelectOptions();
      // Add loading?
    }, error =>
    {
      alert("Error in loading parameters, new-param-mapping.component.ts");
    });

    // Subscribe the currentParameter to the value saved in the Data Service
    this.parameterSubscription = this.dataService.currentParameter.subscribe(currentParameter =>
    {
      this.selectedParameter = currentParameter;
      this.hintText = (this.selectedParameter == null ) ? this.defaultHintText : this.selectedParameter.parameterName;
    });
  }


  ngOnChanges(changes: SimpleChanges): void
  {
    this.updateSelectOptions();
    this.onSelectParam(0);
  }

  // We must unsubscribe before the component gets destroyed!
  ngOnDestroy(): void
  {
    this.parameterSubscription.unsubscribe();
  }

  private updateSelectOptions()
  {
    this.selectBoxItems = this.generateSelectOptions();
  }

  generateSelectOptions(): SelectBoxItem[]
  {
    if(this.parameterList == null) return;
    let items: string[] = [];
    for (let i = 0; i < this.parameterList.length; i++)
    {
      items.push(this.parameterList[i].parameterName);
    }
    return SelectBoxItem.getSelectBoxArray(items);
  }

  onSelectParam(index: number)
  {
    if (!!this.parameterList) {
      if(index == -1)
      {
        this.dataService.changeProduct(null);
        this.hintText = this.defaultHintText;
      }
      else
      {
        this.selectedParameter = this.parameterList[index];
        // this.dataService.changeProduct(this.parameterList[index]);
        if (!!this.selectedParameter)
        this.hintText = this.selectedParameter.parameterName;
      }
      this.onSelectionChanged.emit(this.selectedParameter);
    }
    else {
      this.hintText = this.defaultHintText;
    }   
  }
}

