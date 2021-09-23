import { Injectable } from '@angular/core';
import { data, map } from 'jquery';
import { Observable } from 'rxjs';
import { WebServiseService } from '../WebService/web-service.service';
import { Feedback } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private webservice :WebServiseService) { }

  public sendFeedBack(id:number,type:string, topic:string,subject:string){
    let data =new Map();
    data.set("userId",id);
    data.set("userType",type);
    data.set("userTopic",topic);
    data.set("userSubject",subject);
    this.webservice.post<boolean>("feedback", data);
  }

  public updateStatus(id: number, status: boolean)
  {
    let map = new Map<string,any>();

    map.set("id", id)
    map.set("status", status)
    
    
    return this.webservice.put<boolean>("feedBack/updateFeedBack", map);

  }


  public saveFeedBack(id:number,type:string, topic:string,subject:string) {
    let data =new Map();
    data.set("userId",id);
    data.set("userType",type);
    data.set("userTopic",topic);
    data.set("userSubject",subject);
      this.webservice.post<boolean>("Feedback/saveFeedBack", data);
  }
  public getAllFeedBacks(): Observable<Feedback []>{
    return this.webservice.get<Feedback[]>("feedBack/getAllFeedBacks", null);
  }
  

}
