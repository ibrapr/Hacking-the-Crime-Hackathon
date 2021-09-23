import { Injectable } from '@angular/core';
import { LogInComponent } from './dell/generalScreens/log-in/log-in.component';
import { User } from './dell/models/User';
import { LogInServiceService } from './dell/services/LogInService/log-in-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  
  u:User = this.logInService.usr;
  static admin = true;
  static config = true;
  static tester = true;
  
  isAdmin(){
    const promise = new Promise<any>((resolve, reject) => {
      resolve(UserPermissionService.admin);
    })
    return promise;
  }
  isConfig(){
    const promise = new Promise<any>((resolve, reject) => {
      resolve(UserPermissionService.config);
    })
    return promise;
  }
  isTester(){
    const promise = new Promise<any>((resolve, reject) => {
      resolve(UserPermissionService.tester);
    })
    return promise;
  }
  constructor(private logInService: LogInServiceService) { }

  setAdmin(bool: boolean){
    UserPermissionService.admin=bool;
  }
  setConfig(bool: boolean){
    UserPermissionService.config=bool;
  }
  setTester(bool: boolean){
    UserPermissionService.tester=bool;
  }

}
