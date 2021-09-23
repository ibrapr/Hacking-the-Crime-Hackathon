import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { FeedbackService } from 'src/app/dell/services/feedbackService/feedback.service'
import { UserService } from 'src/app/dell/services/UserService/user.service';
import { LogInServiceService } from 'src/app/dell/services/LogInService/log-in-service.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  data: string;
  remainingText: number;
  value: string;
  bug: string;
  subject: string;
  topic: string;
  selectChoice: string;
  maxLength: number;
  activeModal: any;
  public loading = false;

  options: string[] = ["Bug", "FeedBack"]
  selectOptions: SelectBoxItem[] = [];

  constructor(private loginService: LogInServiceService, private actionAlert: ActionAlertService, private sendFeedBack: FeedbackService, private userService: UserService) { }

  ngOnInit(): void {
    this.selectOptions = SelectBoxItem.getSelectBoxArray(this.options);
  }

  sendFeedBackReport() {
    // here we call the function in service
    if (this.selectChoice != undefined || this.subject != undefined || this.topic != undefined) {
      this.loading = true;
      alert(this.loginService.usr.id);
      this.userService.sendFeedBackEmail(this.loginService.usr.id, this.selectChoice, this.topic, this.subject).subscribe(
        (success) => { this.loading = false }
      );
      alert("thanks for your co-op"+"\n"+"we're much obliged for your time!");
    }
    else {
      alert("some of the fields are missing");
    }
  }
  ResetTextArea() {
    this.actionAlert.confirmAlert('Are you sure to reset your ticket?',
      '' + '',
      '',
      'ticket has been deleted',
      '',
      'ticket is not affected',
      success => {
        this.topic = "";
        this.subject = "";
        
      },
      failure => {
      }
    )
  }
  onSelectOption(index: number) {
    if (index == 0) {
      this.selectChoice = "Bug";
    }
    if (index == 1) {
      this.selectChoice = "FeedBack";
    }
    // alert(this.selectChoice);
  }

}