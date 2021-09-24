import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import { Report } from '../../models/Report';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  private reportSource = new BehaviorSubject<Report>(null);
  currentReport = this.reportSource.asObservable();
  
  constructor() { }


  changeReport(report : Report)
  {
    this.reportSource.next(report);
  }
  
}
