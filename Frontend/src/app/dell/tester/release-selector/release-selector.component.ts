import { EventEmitter, Input, OnChanges, Output, SimpleChanges, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Release } from '../../models/Release';
import { SelectBoxItem } from '../../models/SelectBoxItem';

@Component({
  selector: 'app-release-selector',
  templateUrl: './release-selector.component.html',
  styleUrls: ['./release-selector.component.scss']
})
export class ReleaseSelectorComponent implements OnInit , OnChanges {
  @Input()
  public fit = true;
  @Input()
  public labelText: string = "";
  @Input()
  public releaseSelected: Release;
  @Input()
  public releaseList: Release[];
  @Input()
  public selectBoxItems: SelectBoxItem[];
  @Input()
  public disabled:boolean;
 

  hintText: String = "Select Release";
  selectedIndex: number = 0;
  selectedRelease: Release;

  @Output()
  public onSelectionChanged: EventEmitter<Release> = new EventEmitter<Release>();
 


  constructor() { }   


  ngOnInit(): void {

    
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectBoxItems = this.generateSelectOptions();
  }


  generateSelectOptions(): SelectBoxItem[] {
    if(this.releaseList == null){
      return;
    }
    let names : string[] = [];
    for (let i = 0; i < this.releaseList.length; i++) {
      names.push(this.releaseList[i].releaseName + " - " + this.releaseList[i].version);
    }
    return SelectBoxItem.getSelectBoxArray(names);
  }

  onSelectRelease(newRelease:Release) {
    if(this.releaseList == null){
      return;
    }
    this.selectedRelease = newRelease;
    this.onSelectionChanged.emit(this.selectedRelease);
    // if (!!this.releaseList) {
    //   if(index == -1)
    //   {
    //     this.dataService.changeProduct(null);
    //     this.hintText = this.defaultHintText;
    //   }
    //   else
    //   {
    //     this.selectedParameter = this.parameterList[index];
    //     // this.dataService.changeProduct(this.parameterList[index]);
    //     if (!!this.selectedParameter)
    //     this.hintText = this.selectedParameter.parameterName;
    //   }
    //   this.onSelectionChanged.emit(this.selectedRelease);
    // }
    // else {
    //   this.hintText = this.hintText;
    // }  
  }
}