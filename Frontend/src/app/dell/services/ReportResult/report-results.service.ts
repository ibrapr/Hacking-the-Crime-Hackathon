import { Injectable } from '@angular/core';
import { WebServiseService } from '../WebService/web-service.service'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportResult } from '../../models/ReportResult';

@Injectable({
  providedIn: 'root'
})
export class ReportResultService {

  constructor(private webService: WebServiseService, private httpClient: HttpClient) { }


  public getUserFilesCreated(sd : string, ed : string): Observable<ReportResult>
  {
    let data = new Map<string, any>()
    .set("startDate", sd)
    .set("endDate", ed);

    return this.webService.get<ReportResult>("TestConfiguration/getUserFilesCreated/", data);
  }
  public getUserFilesCreatedForProduct( productId : number, releaseId: number ,sd : string, ed : string,): Observable<ReportResult>
  {
    let data = new Map<string, any>()
    .set("startDate", sd)
    .set("endDate", ed)
    .set("productId", productId)
    .set("releaseId",releaseId);
    return this.webService.get<ReportResult>("TestConfiguration/getUserFilesCreatedForProduct/", data);
  }
  public getRolesTypeStatisics(): Observable<ReportResult>
  {
    return this.webService.get<ReportResult>("User/getRolesTypeStatisics", null);
  }
}
