import { Role } from './../../../models/Role';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { DataTable } from '../../../models/DataTable';
import { UserService } from '../../../services/UserService/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.scss']
})


export class AccessPageComponent implements OnInit {

  public userr$: Observable<any>;
  public userId: number;
  public status: string = "";
  public users: User[] = [];
  public filteredUsers: User[] = []; // it's a copy for the list of all users;
  public title = "Roles";
  public titles = ['Name', 'Username(Email)', 'Status', 'Roles'];
  public rows = [];
  public userRoles: string = "";
  public roles: Role[] = [];
  public select: SelectBoxItem[];
  public dataTable = new DataTable();
  public user = new User();
  public roleNames: string[];
  public activeUsers: User[] = [];
  public inActiveUsers: User[] = [];
  public isChecked: boolean = true;
  public index = 0;
  public roleId: number = 0;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ActionAlertService) {
    this.deleteFunction = this.deleteFunction.bind(this);
    this.editUserFunction = this.editUserFunction.bind(this);
  }

  ngOnInit(): void {
    this.roleNames = [];
    this.userr$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = Number(params.get('id'));
        alert(this.userId);
        return this.userService.getAllUsers();
      })
    );

    this.roleNames.push('All');
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
    this.userService.getAllUsers().subscribe((users) => {
      this.users = [];
      this.users = users;
      console.log(this.users);
      this.filteredUsers = users;
      console.log(this.filteredUsers);
      this.users.forEach((user) => {
        if (user.status) {
          this.activeUsers.push(user);
        } else {
          this.inActiveUsers.push(user);
        }
        this.filteredUsers = this.activeUsers;
        this.updateTable(this.filteredUsers);
      });
    }, (err) => {
      alert(err);
    });
  }

  private updateTable(users: User[]) {

    this.rows = [];
    this.dataTable = new DataTable();
    this.dataTable.titles = this.titles;
    users.forEach((user) => {
      if (user.status) {
        this.status = "Active";
        user.roles.forEach((role) => {
          this.userRoles = role.name;
        });
        this.rows.push([user.name, user.email, this.status, this.userRoles]);
      } else {
        this.status = "In Active";
        this.rows.push([user.name, user.email, this.status, user.roles[0].name]);
      }
    });
    this.dataTable.rows = this.rows;
  }

  onStatusChange(status: boolean) {
    this.isChecked = status;
    if (!status) {
      this.filterByRole(this.roleId)
      this.filteredUsers = this.inActiveUsers;
    } else {
      this.filterByRole(this.roleId)
      this.filteredUsers = this.activeUsers;
    }
  }

  // filter by role
  filterByRole($event): boolean {

    // if All
    if ($event == 0) {
      this.roleId = 0;
      // if active
      if (this.isChecked) {
        this.filteredUsers = [];
        this.filteredUsers = this.activeUsers;
        this.updateTable(this.filteredUsers);
        // if in active
      } if (!this.isChecked) {
        this.filteredUsers = [];
        this.filteredUsers = this.inActiveUsers;
        this.updateTable(this.filteredUsers);
      }
      // if chosen a specific role
    } else {
      let i = $event - 1;
      this.roleId = this.roles[i].id;
      this.userService.getUsersByRole(this.roleId).subscribe((users) => {
        this.filteredUsers = [];
        // if active
        if (this.isChecked) {
          this.filteredUsers = [];
          users.forEach((user) => {
            // active user
            if (user.status) {
              this.filteredUsers.push(user);
            }
          });
          // if in active
        } else if (!this.isChecked) {
          this.filteredUsers = [];
          users.forEach((user) => {
            // user is in active
            if (!user.status) {
              this.filteredUsers.push(user);
            }
          });
        }
        this.updateTable(this.filteredUsers);
      }, (err) => {
        alert(err);
      });
      return true;
    }
  }

  deleteFunction(index: number): boolean {
    let userId: number;
    this.index = index;
    userId = this.filteredUsers[index].id;
    if (this.filteredUsers[index].status) {

      this.service.confirmAlert('',
        'Are you sure you want to delete this user ' + this.filteredUsers[index].email + '?',
        '',
        'user has been deleted',
        '',
        ' user has not been deleted',
        success => {
          this.userService.deleteUser(userId).subscribe((val) => {
            if (val) {
              this.activeUsers[index].status = false;
              this.inActiveUsers.push(this.activeUsers[index]);
              this.activeUsers.splice(this.index, 1);
            }
            this.updateTable(this.activeUsers);
            console.log("success");
          }
            , (err) => {
              alert(err);
            })
        }, (failure) => { });
    } else {
      this.service.confirmAlert('',
        'This user is already in Active ' + this.filteredUsers[index].email + '?',
        '',
        'you cannot delete this user ! ',
        '',
        '',
        success => {

        }, (failure) => { });
    }
    return true;

  }

  editUserFunction(index: number): void {
    this.index = index;
    let id = this.filteredUsers[index].id;
    console.log("user is to update is : " + id);
    try {
      this.router.navigate(['/dell/admin/addUserPage', { id: id }]);
    } catch (error) {
      console.log(error);
    }
  }
}
