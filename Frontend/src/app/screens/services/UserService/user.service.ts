import { Observable } from 'rxjs';
import { User } from 'src/app/screens/models/User';
import { Injectable } from '@angular/core';
import { WebServiseService } from '../WebService/web-service.service';
import { Role } from '../../models/Role';
import { LogInServiceService } from '../LogInService/log-in-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private loginService: LogInServiceService, private webService: WebServiseService) {
  }

  // api
  public getAllUsers(): Observable<User[]> {
    return this.webService.get<User[]>('User/getAllUsers', null);
  }

  // api
  public addUser(user: User): Observable<boolean> {
    let data = new Map<string, any>();
    data.set("email", user.email);
    data.set("name", user.name);
    data.set("password", user.password);
    data.set("phoneNumber", user.phoneNumber);
    data.set("roleId", user.roles[0].id);
    //console.log(data);
    return this.webService.postBool<boolean>('User/addUser', data, true);
  }

  // api
  public deleteUser(id: number): Observable<boolean> {
    let user = new Map<string, any>();
    user.set("id", id);
    console.log("user is is : " + id);

    return this.webService.delete<boolean>('/User/deleteUser', user);
  }
  // api
  public updateUser(user: User): Observable<User> {
    let data = new Map<string, any>();
    data.set("email", user.email);
    data.set("id", user.id);
    data.set("name", user.name);
    data.set("password", user.password);
    data.set("phoneNumber", user.phoneNumber);
    data.set("roleId", user.roles[0].id);
    data.set("status", user.status);

    return this.webService.put<User>('User/updateUser', data);
  }

  //api
  public getAllRoles(): Observable<Role[]> {
    return this.webService.get<Role[]>('User/getAllRoles', null);
  }

  // api
  public getUserById(id: number): Observable<User> {
    let data = new Map<string, any>();
    data.set("id", id);
    return this.webService.get('User/getUserInfo', data);
  }

  // api
  public getUsersByRole(id: number): Observable<User[]> {
    let users = new Map<string, any>();
    users.set("roleId", id);
    return this.webService.get<User[]>('User/filterUsersByRole', users);
  }

  public validateEmail(email: string): boolean {
    if (email) {
      if (email.match(/^\w+\.?\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  public validatePass(password: string): boolean {
    if (password.length >= 8) {
      return true;
    }
    return false;
  }
  public validateName(name: string): boolean {
    if (name) {
      if (name.match(/^[a-zA-Z ]{2,}$/)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  // sendFeedBackEmail(int userID, String text)this.selectChoice ,  this.topic , this.subject
  public sendFeedBackEmail(userID: number, topic: string, subject: string, content: string) {
    let data = new Map<string, any>();
    data.set("userID", userID);
    data.set("topic", topic);
    data.set("subject", subject);
    data.set("content", content);

    return this.webService.postBool<any>("User/sendFeedBackEmail", data, true);
  }
}
