import { Component, EventEmitter, Input, OnInit, ViewChild, Output, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable } from '../../models/DataTable';
import { SelectBoxItem } from '../../models/SelectBoxItem';

@Component({
  selector: 'app-numbine-actions-table',
  templateUrl: './numbine-actions-table.component.html',
  styleUrls: ['./numbine-actions-table.component.scss']
})
export class NumbineActionsTableComponent implements OnInit, OnChanges {
  @Input()
  dataTable: DataTable = new DataTable();

  cloneTable: DataTable = new DataTable();

  @Input()
  trashBool: Boolean = false;
  @Input()
  trashClick: Function;
  @Input()
  editBool: Boolean = false;
  @Input()
  editClick: Function;
  @Input()
  downloadBool: Boolean = false;
  @Input()
  downloadClick: Function;
  @Input()
  openClick: Function;
  @Input()
  hasActions = false;
  @Input()
  hasSelect = false;
  // for Dashboard 
  @Input()
  hasParameterFileAndFileConfig: Boolean = false;
  // select inputs
  // Functions not needed
  @Input()
  startReleaseFunc: Function;
  @Input()
  endReleaseFunc: Function;
  @Input()
  startReleaseData: SelectBoxItem[];
  @Input()
  endReleaseData: SelectBoxItem[];
  endReleases: SelectBoxItem[][] = [];
  versionIndexInSelector: number[] = []; // per row
  @Input()
  idStart: number = 0;
  @Input()
  idEnd: number = 0;
  currentStart: number = 0;
  currentEnd: number = 0;
  value: any;
  openBool: Boolean = false;
  colName: number;
  order: string;
  public page: number = 1;
  public pageSize: number=10;
  public collectionSize: number=200;

  @Output()
  trashModelChange = new EventEmitter<any>();
  @Output()
  editModelChange = new EventEmitter<any>();
  @Output()
  openModelChange = new EventEmitter<any>();
  @Output()
  downloadModelChange = new EventEmitter<any>();

  static k: number;
  trashEmit(value: any) {

    this.cloneTable.rows.forEach((v, index) => {
      if (value === v) {
        // alert(value)
        this.trashModelChange.emit(index);
        // NumbineActionsTableComponent.k=index;
      }
    });
  }
  editEmit(value: any) {
    // alert("da")
    this.cloneTable.rows.forEach((v, index) => {
      if (value === v) {
        this.editModelChange.emit(index);
        // NumbineActionsTableComponent.k=index;
      }
    });
  }
  openEmit(value: any) {
    this.cloneTable.rows.forEach((v, index) => {
      if (value === v) {
        this.openModelChange.emit(index);
        // NumbineActionsTableComponent.k=index;
      }
    });
  }
  downloadEmit(value: any) {
    this.cloneTable.rows.forEach((v, index) => {
      if (value === v) {
        this.downloadModelChange.emit(index);
        // NumbineActionsTableComponent.k=index;
      }
    });
  }
  // @Input()
  // indexModel : number;

  getID(name) {
    alert(this.value);
    // this.pages=this.dataTable.rows.length / 10;
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateEndReleases(true);
    // alert('change '+JSON.stringify(changes))
    this.update();

  }
  update() {
    // setTimeout(() => {
    console.log(this.dataTable.rows.length)
    this.collectionSize=this.dataTable.rows.length;
    this.cloneTable.titles = this.dataTable.titles.slice();
    this.cloneTable.rows = this.dataTable.rows.slice();
    // }, 2000)

  }
  ngOnInit(): void {
    this.hasActions = (this.openBool || this.editBool || this.trashBool || this.downloadBool).valueOf();
    // this.update();
  }

  /**
   * @param generateAll if true, adds all releases to the end list,
   * otherwise adds only releases bigger than/equal to the ones selected in start release
   */
  private updateEndReleases(generateAll: boolean, row?: number) {
    if (this.endReleaseData != null) {
      if (row != undefined) {
        this.endReleases.splice(row, 1);
        let arr: SelectBoxItem[] = [];
        arr.push(this.endReleaseData[0]);
        for (let j = this.versionIndexInSelector[row] + 1; j < this.endReleaseData.length; j++) {
          arr.push(this.endReleaseData[j]);
        }
        this.endReleases.splice(row, 0, arr);
      }
      else {
        this.endReleases.length = 0;
        this.versionIndexInSelector.length = this.endReleaseData.length;
        // I need a list for every value!!! [][]
        if (generateAll) {
          for (let i = 0; i < this.endReleaseData.length; i++) {
            this.endReleases.push(this.endReleaseData);
            this.versionIndexInSelector[i] = 0;
          }
        }
        else {

          for (let i = 0; i < this.dataTable.rows.length; i++) {
            let arr: SelectBoxItem[] = [];
            arr.push(this.endReleaseData[0]);
            for (let j = this.versionIndexInSelector[i] + 1; j < this.endReleaseData.length; j++) {
              arr.push(this.endReleaseData[j]);
            }
            this.endReleases.push(arr);
          }
        }

      }
    }
  }

  setStartReleaseIndex(index: number, row: number) {
    this.versionIndexInSelector[row] = +index;
    this.currentStart = index;
    this.updateEndReleases(false, row);
  }
  setEndReleaseIndex(index: number, row: number) {
    this.currentEnd = index;
  }
}


