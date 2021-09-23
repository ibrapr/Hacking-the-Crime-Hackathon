import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-numbine-action-alert',
  templateUrl: './numbine-action-alert.component.html',
  styleUrls: ['./numbine-action-alert.component.scss']
})
export class NumbineActionAlertComponent implements OnInit {

  constructor() { }
  // (click)="confirmAlert()
  ngOnInit(): void {
  }
  
}
