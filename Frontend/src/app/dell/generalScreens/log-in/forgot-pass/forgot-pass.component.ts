import { Component, OnInit } from '@angular/core';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { ForgotPassService } from "../../../services/forgotPasswordService/forgot-pass.service"

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  public loading: boolean =false ;
    constructor(private actionAlert:ActionAlertService,private forgotPassService: ForgotPassService) { 
      this.loading=false;
    }
    passReset (email:string){
      this.loading=true;
      this.forgotPassService.passResetAssync(
        email =>
        { 
          if(this.forgotPassService.ValidateEmail(email)){
            
        console.log('pass changed',email);
        this.actionAlert.alert("all is good",3000,true,'center','success');}
        this.loading=false;
      },
        err=>{
          this.actionAlert.alert("something went wrong",3000,true,'center','error');
          this.loading=false;
        },
        email);
      
    }
  
    ngOnInit(): void {
      
    }

}
