import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-numbine-button-alert',
  templateUrl: './numbine-button-alert.component.html',
  styleUrls: ['./numbine-button-alert.component.scss']
})
export class NumbineButtonAlertComponent implements OnInit {
  @Input() buttonName:String
  @Input() alertTitle:String
  @Input() alertText:String
  @Input() successMassege:String
  @Input() failMassege:String
  @Input() fileName:String
  @Input() fileType:String


  constructor() { }

  ngOnInit(): void {
  }

  confirmAlert() {

    
    // Swal.fire({
    //   type: 'warning',
    //   showCloseButton: true,
    //   showCancelButton: true,
      
    //   html:'<div> <label >'+this.alertTitle+ '</label> <br><label>'+this.alertText+'</label></div> <div><label style="margin-right:30px;" >'+this.fileName+'</label><label >'+this.fileType+'</label></div>'
    
      
    // }).then((willDelete) => {
    //     if (willDelete.dismiss) {
    //       Swal.fire('', this.failMassege, 'error');
    //     } else {
    //       Swal.fire('', this.successMassege, 'success');
    //     }
    //   });
  }

}
