import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { DataTable } from './screens/models/DataTable';
import { User } from './screens/models/User';
import { LogInServiceService } from './screens/services/LogInService/log-in-service.service';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public nav: NavigationItem,private logInService: LogInServiceService) { }
  ngOnInit() {
    
    // this.nav.setHidden(false,"admin");
    // this.nav.setHidden(false,"config");
    // this.nav.setHidden(false,"tester");
    if(!!!this.u){
      // this.router.navigateByUrl('/login');
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    
  }
  u:User = this.logInService.usr;

  
}
