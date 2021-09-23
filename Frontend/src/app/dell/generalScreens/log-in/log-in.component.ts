import { Component, OnInit } from '@angular/core';
import { ButtonClass } from 'src/app/demo/enums/myenum.enum';
import { LogInServiceService } from 'src/app/dell/services/LogInService/log-in-service.service'
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public usr: User;
  public loading: boolean;
  public bool : boolean = false;
  buttonClass = ButtonClass;
  constructor(private actionAlert: ActionAlertService,private logInService: LogInServiceService, private router: Router,private nav: NavigationItem) {
    this.loading = false;
  }
  submit(email: string, password: string) {
    this.loading = true;
    this.logInService.validteUserAsync(
      usr => {
        this.usr = usr;
        console.log('test', usr);
        if (this.logInService.ValidateEmail(email)) {
          this.actionAlert.alert("All good!",3000,true,'center','success');
        }
        this.loading = false;
        if(this.usr.roles[0].name === "admin"){
          this.nav.setHidden(true,"config")
          this.nav.setHidden(true,"tester")
          this.nav.setHidden(false,"admin")
          this.router.navigateByUrl('/dell/admin');
        }
        if(this.usr.roles[0].name === "configurator" || this.usr.roles[0].name==="config"){
          this.nav.setHidden(true,"admin")
          this.nav.setHidden(true,"tester")
          this.nav.setHidden(false,"config")
          this.router.navigateByUrl('/dell/config');
        }
        if(this.usr.roles[0].name === "tester" || this.usr.roles[0].name === "user"){
          this.nav.setHidden(true,"admin")
          this.nav.setHidden(true,"config")
          this.nav.setHidden(false,"tester")
          this.router.navigateByUrl('/dell/tester');
        }
      },
      (err) => {
        console.log(err);
        this.actionAlert.alert("something went wrong",2500,true,'center','error');
        this.router.navigateByUrl('/login')
        this.loading = false;
      },
      email, password);

  }

  ngOnInit(): void {

  }


}