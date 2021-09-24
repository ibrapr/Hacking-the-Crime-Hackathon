import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from '../../models/Report';
import { DataService } from '../../services/DataService/data.service';
import { ActionAlertService } from '../../services/dialogService/action-alert.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.scss']
})
export class ExplainComponent implements OnInit {

  constructor(private dataService: DataService, private reportService: ReportServiceService,private actionAlert: ActionAlertService
    , private route: Router) { }
  currentReport: Report;
  ReportSubscription: Subscription;
  explain: String;
  ngOnInit(): void {
    this.ReportSubscription = this.dataService.currentReport.subscribe(currentReport => {
      this.currentReport = currentReport;

    });
  }
  submit() {
    this.reportService.updateExplaination(this.explain, this.currentReport.id).subscribe(() => {
      this.actionAlert.alertWithCallback("The explaination has been updated successfully!", 2500, false,()=>{
        this.route.navigate(["stop/school/table"]);
      }, 'center', 'success');

    });

  }
}
