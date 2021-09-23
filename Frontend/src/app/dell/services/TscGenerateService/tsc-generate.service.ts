import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneratedTestReport } from '../../models/GeneratedTestReport';
import { Parameter } from '../../models/Parameter';

import { Release } from '../../models/Release';
import { TscFile } from '../../models/TscFile';
import { WebServiseService } from '../WebService/web-service.service';
@Injectable({
  providedIn: 'root'
})
export class TscGenerateService {
  tscFile: TscFile;
  constructor(private webService: WebServiseService, private httpClient: HttpClient) { }

  public generateTscFileAsync(userId: number, productId: number, releaseId: number, testCycle: string, paramsList: string, tuple: string): Observable<GeneratedTestReport> {
    let tup = parseInt(tuple);
    let paramsMap: Map<string, any> = new Map();
    paramsMap.set("paramValues", paramsList).set("productId", productId).set("releaseId", releaseId).set("testCycle", testCycle).set("tuple", tup).set("userId", userId);

    let ob = this.webService.postBool<GeneratedTestReport>("/TestConfiguration/generateAndSave", paramsMap, true);
    return ob;
  }

  public viewAllFilesWithoutDate(): Observable<TscFile[]> {
    return this.webService.get<TscFile[]>("TestConfiguration/viewAllFilesWithoutDate", null);
  }

  public deleteFile(id: number) {
    let newFile = new Map<string, any>();
    newFile.set("tCFId", id)

    return this.webService.delete<boolean>("TestConfiguration/deleteFile", newFile);
  }

  public downloadFile(fileName: string) {
    let data = new Map<string, any>();
    data.set("fileName",fileName);
    return this.webService.get<boolean>("TestConfiguration/getFile", data);
  }
  public viewAllFilesAsync (eDate:string,prodId:number,releaseId:number,sDate:string): Observable<TscFile[]> {
    let map =new Map<string,any>();
    map.set("endDate",eDate).set("prodId",prodId).set("releaseId",releaseId).set("startDate",sDate);
    
          return this.webService.get("TestConfiguration/viewAllFiles",map);
             
        
        }
    
     public viewFilesByUserIdAsync (eDate:string,prodId:number,releaseId:number,sDate:string,userId:number): Observable<TscFile[]>{
      
    
        let map =new Map<string,any>();
    map.set("endDate",eDate).set("prodId",prodId).set("releaseId",releaseId).set("startDate",sDate).set("userId",userId);
    
          return this.webService.get("TestConfiguration/viewAllTesterFiles",map);
             
    
    }
}