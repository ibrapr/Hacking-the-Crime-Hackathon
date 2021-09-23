import { getLocaleNumberSymbol } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { defineLocale } from 'moment';
import { User } from 'src/app/dell/models/User';
import { Role } from '../../models/Role'
import { ActionAlertService } from '../dialogService/action-alert.service';
import { WebServiseService } from '../WebService/web-service.service';

const users = [
  {
    email: 'shahena618@gmail.com',
    password: '123456',
    role: 'admin'
  },
  {
    email: 'ibrahem618@gmail.com',
    password: '123456',
    role: 'config'
  }
]

@Injectable({
  providedIn: 'root'
})
export class LogInServiceService {
  public usr: User;

  constructor(private actionAlert:ActionAlertService,private webservice: WebServiseService) { }

  public validteUserAsync(successCallback, failCallback, email: string, password: string): void {
    let params: Map<string,any> = new Map();
    params.set("email",email).set("password",password);

    this.webservice.get<User>("User/validate", params).subscribe((user) => {
      if (user != null) {
        successCallback(user);
        this.usr = user;

      }
      else {
        failCallback(null)
      }
    }, (err) => {
      failCallback(err)
    })
  }

  // public dummyValidteUser(email: string, password: string){

  //   for(const user of users){
  //     if(user.email===email){
  //       if(user.password === password){
  //         this.setUser(email, password,user.role);
  //         alert(email+" "+password)
  //         return true;
  //       }
  //       return false;
  //     }
  //   }
  //   return false;
  // }

  // public setUser(email:string, password:string, role:string){
  //   LogInServiceService.usr.email=email;
  //   LogInServiceService.usr.password=password;
  //   LogInServiceService.usr.role=role;
  // }
  public ValidateEmail(email: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
   // alert("You have entered an invalid email address!")
   this.actionAlert.alert("You have entered an invalid email address!",3000,true,'center','error');
    return (false)
  }

}
