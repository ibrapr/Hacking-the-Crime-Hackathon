import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/dell/models/DataTable';
import { Feedback } from 'src/app/dell/models/feedback';
import { ActionAlertService } from 'src/app/dell/services/dialogService/action-alert.service';
import { FeedbackService } from 'src/app/dell/services/feedbackService/feedback.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit {

  public feedbacks: Feedback[];

  edit: boolean = true;
  public title = ['Row', 'User name', 'topic', 'Date & Time', ' Validations', 'Subject'];
  public rows: any = [];
  public dataTable = new DataTable();

  constructor(private FeedBackService: FeedbackService) { }

  ngOnInit(): void {
    let obsProducts = this.FeedBackService.getAllFeedBacks();
    obsProducts.subscribe(data => {
      this.feedbacks = data;
      this.dataTable = new DataTable();
      this.dataTable.rows = this.rows;
      this.dataTable.titles = this.title;
      this.updateRows();
    }, error => {
    });
  }
  updateRows() {
    this.rows.length = 0;
    let counter = 1;
    let str;
    this.feedbacks.forEach(element => {
      if (element.status == true) { str = "Fixed"; }
      else { str = "Unfixed" }
      let date = formatDate(element.date, "MM/dd/yyyy hh:mm", 'en');
      this.rows.push([counter, element.user.name, element.topic, date, str, element.subject]);
      counter++;
    });
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.title;
  }

  updateFunction(index: number) {
    // this.dataService.changeProduct(this.products[index]);
    // this.router.navigate(['/dell/config/editProduct', { update: 'true' }]);
    this.FeedBackService.updateStatus(this.feedbacks[index].id, !this.feedbacks[index].status)
      .subscribe((data) => {
        this.feedbacks[index].status = !this.feedbacks[index].status
        this.updateRows();
        console.log(data);
      })
  }


}
