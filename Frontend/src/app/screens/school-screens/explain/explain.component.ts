import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../../models/Report';
import { DataService } from '../../services/DataService/data.service';
import { ReportServiceService } from '../../services/report-service.service';

@Component({
  selector: 'app-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.scss']
})
export class ExplainComponent implements OnInit {

  constructor(private dataService: DataService, private reportService: ReportServiceService) { }
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
      
    });

  }
}
