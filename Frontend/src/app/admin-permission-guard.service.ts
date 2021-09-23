import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPermissionService } from './user-permission.service';
@Injectable({
  providedIn: 'root'
})
export class AdminPermissionGuardService {
  constructor(private userPermissionService:UserPermissionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.userPermissionService.isAdmin()
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
    return this.userPermissionService.isAdmin();
  }
}