import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LogInServiceService } from 'src/app/dell/services/LogInService/log-in-service.service';

@Component({
  selector: 'app-numbine-van-right',
  templateUrl: './numbine-van-right.component.html',
  styleUrls: ['./numbine-van-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NumbineVanRightComponent implements OnInit {
  name:string
  constructor(private logInserv:LogInServiceService,private router:Router) { }
  
  ngOnInit(): void {
    this.name = this.logInserv.usr.name;
  }
  logOut(): void {
    this.logInserv.usr = null;
    this.router.navigateByUrl('/login');
  }
}
