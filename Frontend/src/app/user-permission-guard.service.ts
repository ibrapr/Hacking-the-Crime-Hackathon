import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPermissionService } from './user-permission.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionGuardService implements CanActivate{
  // TODO add to the constructor an option for user type.
  constructor(private userPermissionService:UserPermissionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.userPermissionService.isTester()
    .then(() => {
      (permission: boolean) => {
        if(permission){
          return true
        }
        else{
          this.router.navigate(['/**']);
        }
      }
    });
    return this.userPermissionService.isTester();
  }


}
