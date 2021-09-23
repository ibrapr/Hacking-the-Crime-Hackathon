import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { ActionAlertService } from '../dialogService/action-alert.service';
import { WebServiseService } from '../WebService/web-service.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private actionAlert:ActionAlertService,private webservice: WebServiseService) { }

  public passResetAssync(successCallback,failCallback,email:string): void{
   
      
        const emailMap=new Map<string,any>();
        emailMap.set("email",email)
        this.webservice.get<User>("/User/forgotPassword",emailMap).subscribe(()=>{
     successCallback(email);
    },
     (err)=>{
       failCallback(err);
 
  });
   }
   public ValidateEmail(email:string) : boolean
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
   // alert("You have entered an invalid email address!")
    this.actionAlert.alert("You have entered an invalid email address!",3000,true,'center','error');
    return (false)
}
}
