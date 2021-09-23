import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataTable } from 'src/app/dell/models/DataTable';
import { Parameter } from 'src/app/dell/models/Parameter';
import { Release } from 'src/app/dell/models/Release';
import { SelectBoxItem } from 'src/app/dell/models/SelectBoxItem';
import { Value } from 'src/app/dell/models/Value';

@Component({
  selector: 'app-param-release-mapping-table',
  templateUrl: './param-release-mapping-table.component.html',
  styleUrls: ['./param-release-mapping-table.component.scss']
})
export class ParamReleaseMappingTableComponent implements OnInit
{
  dataTable: DataTable = new DataTable();
  @Input()
  rows = [[""]];
  titles = ["Values"]
  startReleaseData: SelectBoxItem[] = [];
  endReleaseData: SelectBoxItem[] = [];
  endReleasesPerValue: SelectBoxItem[][] = [];

  @Input()
  selectedStartIndex: number[] = [];
  @Input()
  selectedEndIndex: number[] = [];
  selectedEndIndexReduced: number[] = []; // The selected index from the reduced list...
  @Input()
  idStart: number = 0;
  @Input()
  idEnd: number = 0;

  @Input()
  parameter: Parameter;
  values: Value[] = [];
  @Input()
  releases: Release[] = [];

  @Output()
  selectedStartIndexEmitter = new EventEmitter<number[]>();
  @Output()
  selectedEndIndexEmitter = new EventEmitter<number[]>();

  start: string[] = [];
  end: string[] = [];


  @Input()
  set calculateEndReleases(value: boolean)
  {
    if (value)
    {
      this.resetTable();
    }
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void
  {
    this.resetTable();
  }

  ngOnInit(): void 
  {
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
    this.resetTable();
    this.setEndReleases();
  }

  private resetTable()
  {
    this.values = this.parameter?.values;
    this.selectedEndIndexReduced = [];
    if (this.startReleaseData != null)
    {
      this.generateRows();
      this.generateSelectOptions();
    }
  }

  setStartReleaseIndex(index: number, row: number)
  {
    this.selectedStartIndex[row] = +index;
    console.log("Selected start " + index + " from row " + row)
    // this.disableUnavailableOptions();
    this.generateEndReleaseOptions(row);
    let diff = this.calculateEndLengthDifference(row);
    if (this.selectedEndIndex[row] > this.selectedStartIndex[row])
    {
      this.selectedEndIndexReduced[row] = this.selectedEndIndex[row] - diff;
    }
    else if (this.selectedEndIndex[row] == 0 || this.selectedEndIndex[row] == -1)
    {
      this.selectedEndIndexReduced[row] = 0;
    }
    else
    {
      this.selectedEndIndex[row] = this.selectedStartIndex[row] + 1;
      this.selectedEndIndexReduced[row] = this.selectedStartIndex[row] + 1 - diff;
      this.selectedEndIndexEmitter.emit(this.selectedEndIndex);
      this.resetTable();
    }
    // console.log("Selected end: " + this.selectedEndIndex[row] + " , reduced " + this.selectedEndIndexReduced[row])

    this.selectedStartIndexEmitter.emit(this.selectedStartIndex);
  }

  setEndReleaseIndex(index: number, row: number)
  {
    if (!this.endReleasesPerValue[row][index].disabled)
    {
      this.selectedEndIndexReduced[row] = +index;
      let selected;
      let diff = this.calculateEndLengthDifference(row);
      if (+index == 0)
      {
        selected = 0;
      }
      else
      {
        selected = (+index) + diff;
      }
      // console.log("Diff: " + diff + " Selected end " + selected + " from row " + row + ", reduced: " + this.selectedEndIndexReduced[row])
      this.selectedEndIndex[row] = selected;
      this.selectedEndIndexEmitter.emit(this.selectedEndIndex);
    }
  }

  private calculateEndLengthDifference(row: number)
  {
    return (this.releases.length + 2) - this.endReleasesPerValue[row].length;
  }

  generateRows()
  {
    if (this.values != null)
    {
      this.rows.length = 0;
      for (let i = 0; i < this.values.length; i++) 
      {
        this.rows.push([this.values[i].value]);
      }
    }
  }

  generateSelectOptions()
  {
    if (this.releases == null)
      return;
    this.endReleasesPerValue = [];
    this.start = [];
    this.end = [];

    this.end.push("Forever");
    if (this.releases != null)
    {
      for (let i = 0; i < this.releases.length; i++)
      {
        this.start.push(this.releases[i].version);
        this.end.push(this.releases[i].version);
      }
    }
    this.start.push("N/A");
    this.end.push("N/A");
    this.startReleaseData = SelectBoxItem.getSelectBoxArray(this.start);
    this.endReleaseData = SelectBoxItem.getSelectBoxArray(this.end);
    if (this.values != null)
    {
      this.setEndReleases();
      // console.log("Reduced: " + this.selectedEndIndexReduced);
    }

    // this.disableUnavailableOptions();
  }

  private setEndReleases()
  {
    for (let i = 0; i < this.values.length; i++)
    {
      this.generateEndReleaseOptions(i);
      let diff = this.calculateEndLengthDifference(i);
      this.selectedEndIndexReduced[i] = this.selectedEndIndex[i] - diff;
      if (this.selectedEndIndex[i] == 0)
      {
        this.selectedEndIndexReduced[i] = 0;
      }
    }
  }

  private generateEndReleaseOptions(i: number)
  {
    let arr: string[] = [];
    arr.push(this.end[0]);
    for (let j = 1; j < this.end.length - 1; j++)
    {
      if (this.selectedStartIndex[i] < j || this.selectedStartIndex[i] == undefined)
      {
        arr.push(this.end[j]);
      }
    }
    arr.push(this.end[this.end.length - 1]);
    this.endReleasesPerValue[i] = (SelectBoxItem.getSelectBoxArray(arr));
    // console.log("Arr: " + JSON.stringify(arr));
    // console.log("End: " + JSON.stringify(this.endReleasesPerValue[i]));
  }

  /**
   * Unused... this disables the select option
   */
  disableUnavailableOptions()
  {
    if (this.values == null || this.endReleasesPerValue == null)
      return;
    for (let i = 0; i < this.values.length; i++)
    {
      if (this.endReleasesPerValue[i] != null)
      {
        for (let j = 1; j < this.endReleasesPerValue[i].length - 1; j++) 
        {
          this.endReleasesPerValue[i][j].disabled = (j - 1 < this.selectedStartIndex[i]) ? true : false;
        }
      }
    }
  }
}
