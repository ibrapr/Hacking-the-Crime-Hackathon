import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TscFile } from '../../models/TscFile';
import { WebServiseService } from '../WebService/web-service.service';

@Injectable({
  providedIn: 'root'
})
export class FitchingService {

  constructor(private webservice:WebServiseService) { }
 public getAllFilesAsync (eDate:string,prodId:number,releaseId:number,sDate:string): Observable<TscFile[]> {
let map =new Map<string,any>();
map.set("endDate",eDate).set("prodId",prodId).set("releaseId",releaseId).set("startDate",sDate);

      return this.webservice.get("TestConfiguration/viewAllFiles",map);
         
    
    }

 public getFilesByUserIdAsync (eDate:string,prodId:number,releaseId:number,sDate:string,userId:number): Observable<TscFile[]>{
  

    let map =new Map<string,any>();
map.set("endDate",eDate).set("prodId",prodId).set("releaseId",releaseId).set("startDate",sDate).set("userId",userId);

      return this.webservice.get("TestConfiguration/viewAllFiles",map);
         

}

  }
