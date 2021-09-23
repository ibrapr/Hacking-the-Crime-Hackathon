import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ParameterService } from '../../../services/ParameterService/parameter.service';
import { Parameter } from 'src/app/dell/models/Parameter';
import { DataTable } from '../../../models/DataTable';
import { WebServiseService } from '../../../services/WebService/web-service.service';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/DataService/data.service';
import { Router } from '@angular/router';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { Injectable } from '@angular/core';
import { Value } from '../../../models/Value';
 Injectable

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent implements OnInit, OnDestroy {
  trash: Boolean = true;
  edit: Boolean = true;
  values : String[];

  parameters: Parameter[] = [];
  loading = false;
  titles =['Param Name','Values'];
  public rows:any=[];
  index = 0;
  str:String="";
  cnt:number;

  dataTable= new DataTable()
  currentParameter: Parameter;
  parameterSubscription: Subscription;
  constructor(private Param : ParameterService,private dataService: DataService,private router:Router,private actionAlert : ActionAlertService) {
    this.deleteRow = this.deleteRow.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
   }

  ngOnInit(): void {
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;

this.dataService.changeParameter(null);
   let obs=this.Param.getAllParameters();
  obs.subscribe((data) => {
    this.dataTable = new DataTable();
    this.dataTable.rows = this.rows;
    this.dataTable.titles = this.titles;
    this.parameters = data;
this.updateRows();

  },
    (err) => {
      alert("error")
    })

    this.parameterSubscription = this.dataService.currentParameter.subscribe(currentParameter => {
      this.currentParameter = currentParameter;
      console.log("Updated current parameter " + this);
    });
   
}
ngOnDestroy(): void
{
    this.parameterSubscription.unsubscribe();
}
updateSelectedParameter(newParameter: Parameter)
  {
    this.currentParameter = newParameter;
  }

updateRows()
{
  this.rows.length = 0;
  this.parameters.forEach(element =>
  {
    this.str="";
    for(let i=0;i<element.values.length;i++)
    {

      if(i<element.values.length-1){
            this.str+=element.values[i].value+", ";
            
          }
            else{
              this.str+=element.values[i].value;
            }
          
    }
          this.rows.push([element.parameterName,this.str]);
  });

  this.dataTable = new DataTable();
  this.dataTable.rows = this.rows;
  this.dataTable.titles = this.titles;
}

// we should get the id of the pararameter that we want to delete !
deleteRow(index:number){  
  this.index = index;
  this.actionAlert.confirmAlert('',
    'Are you sure you want to remove the parameter ' + this.parameters[index].parameterName + '?',
    '',
    'Parameter has been deleted',
    'Your imaginary file is safe :)',
    ' Parameter has not been deleted',
    success => {
      this.Param.deleteParameter(this.parameters[index].id).subscribe(() => {
              this.parameters.splice(index, 1);

        this.updateRows();


         
      });
    },
    failure => { },'warning'
  )
}


updateFunction(index: number)
  {
     this.dataService.changeParameter(this.parameters[index]);
     this.router.navigate(['/dell/config/testConfigrationsEditNew', { update: 'true' }]);  }


  }
