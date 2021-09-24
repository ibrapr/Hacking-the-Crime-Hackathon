import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebServiseService } from './WebService/web-service.service';
import { Report } from '../models/Report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private webService: WebServiseService, private httpClient: HttpClient) { }
  public getAllreports(): Observable<Report[]> {
    return this.webService.get<Report[]>("Report/getAll", null);
  }
  public updateExplaination(explaination:String,id:number)
  {
    let newExp = new Map<string,any>();
    newExp.set("explanation", explaination);
    newExp.set("id", id);
    return this.webService.put<boolean>("Report/updateExplaination", newExp);

  }





}
