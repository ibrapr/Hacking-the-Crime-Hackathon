import { ActionAlertService } from './../../../services/dialogService/action-alert.service';
import { SelectBoxItem } from './../../../models/SelectBoxItem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/dell/models/User';
import { UserService } from '../../../services/UserService/user.service';
import { Role } from 'src/app/dell/models/Role';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {


  user$: Observable<User>;

  public nameValid = true;
  public emailValid = true;
  public phoneValid = true;
  public passwordValid = true;
  public roleValid = false;

  public userId: number = 0;
  public user: User;
  public users: User[] = [];
  public flag = false;
  public title = "Roles";
  public roles: Role[];
  public roleNames: string[];
  public select: SelectBoxItem[];
  public index: number;
  public selectedRole: number = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: ActionAlertService) {
  }

  ngOnInit(): void {
    this.index = 0;
    this.roleNames = ['please choose a role'];
    this.userService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
      this.roles.forEach((role) => {
        this.roleNames.push(role.name);
      });

      this.select = SelectBoxItem.getSelectBoxArray(this.roleNames);
    }
      , (err) => {
        alert(err);
      });

    //get id from querystring
    try {
      this.user = new User();
      this.userId = +this.route.snapshot.paramMap.get('id');

      // if there is an id in the queryString -> in edit page
      if (this.userId) {
        console.log(" user Id is : " + this.userId);
        this.userService.getUserById(this.userId).subscribe((user) => {
          this.user = user;
          this.selectedRole = this.user.roles[0].id;
          console.log("success");
        }
          , (err) => {
            alert(err);
          });
      }
      // to add new user. 
      else {
        this.user = new User();
      }
    } catch (err) {
      console.log(err);
    }
  }

  public createUser(): void {
    console.log(this.index);
    this.flag = true;
    // validation for every field  
    if (!this.userService.validateName(this.user.name)) {
      this.nameValid = false;
    } else if (!this.userService.validateEmail(this.user.email)) {
      this.emailValid = false;
    } else if (!this.userService.validatePass(this.user.phoneNumber)) {
      this.phoneValid = false;
    } else if (!this.userService.validatePass(this.user.password)) {
      this.passwordValid = false;
    } else if (!this.roleValid) {
      this.flag = false;
    }
    else {

      // in update mode
      if (this.userId) {
        this.userService.updateUser(this.user).subscribe((user) => {
          console.log(user);
          console.log("success");
          this.router.navigate(['/dell/admin/accessPage']);
        }
          , (err) => {
            alert(err);
          });
      }
      // in add new user mode 
      else {
        let obs = this.userService.addUser(this.user);
        this.alertService.loadingMenu("Saving...", obs, success => {
          this.alertService.alert("User Has Been Added Successfully", 2000, false, 'center');
          this.router.navigate(['/dell/admin/accessPage']);
        }, error => {
          this.alertService.alert("Failed to save!", 2000, false, 'center', 'error');
        });
      }
    }
  }



  onStatusChange(status: boolean) {
    this.user.status = status;
  }

  chooseRole($event): void {
    this.user.roles = [];
    console.log(" event : " + $event);
    this.index = $event - 1;
    if (this.index == -1) {
      this.roleValid = false;
    } else {
      this.roleValid = true;
      this.user.roles.push(this.roles[this.index]);
      console.log(this.roles[this.index]);
      console.log(this.user);
    }
  }
}
