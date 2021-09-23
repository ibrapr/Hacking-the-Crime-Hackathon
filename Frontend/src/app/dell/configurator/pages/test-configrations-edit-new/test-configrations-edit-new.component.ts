import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '../../../models/DataTable';
import { ParameterService } from '../../../services/ParameterService/parameter.service';
import { Parameter } from 'src/app/dell/models/Parameter';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/DataService/data.service';
import { Value } from '../../../models/Value';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { Injectable } from '@angular/core';
import { ParamList } from '../../../models/ParmList';
import { Router } from '@angular/router';




@Component({
  selector: 'app-test-configrations-edit-new',
  templateUrl: './test-configrations-edit-new.component.html',
  styleUrls: ['./test-configrations-edit-new.component.scss']
})
export class TestConfigrationsEditNewComponent implements OnInit
{
  trash: Boolean = true;
  edit: Boolean = true;
  values: Value[] = [];
  loading = false;
  titles = ['Values'];
  public rows: any = [];
  public paramName: string = "";
  public paramDesc: string;
  public paramVal: string;
  public valLen: number;
  public buttonConditon: boolean;

  dataTable = new DataTable()
  index: number;

  currentParameter: Parameter;
  parameterSubscription: Subscription;
  parmList: any;
  constructor(private Param: ParameterService, private dataService: DataService, private actionAlert: ActionAlertService, private route: Router)
  {
    this.deleteRow = this.deleteRow.bind(this);
  }

  ngOnInit(): void
  {
    // let obs=this.Param.getParametersAsync(); we should put
    this.parameterSubscription = this.dataService.currentParameter.subscribe(currentParameter =>
    {
      this.currentParameter = currentParameter;
      if (currentParameter !== null)
      {
        this.values = this.currentParameter.values;
        this.paramName = this.currentParameter.parameterName;
        this.paramDesc = this.currentParameter.description;
        this.updateValues(this.currentParameter);

      }
    });
    this.updateRows();
    this.dataTable.titles = this.titles;
    this.dataTable.rows = this.rows


  }
  updateRows()
  {
    this.rows.length = 0;
    this.values.forEach(element =>
    {
      this.rows.push([element.value]);
    });
    this.dataTable = new DataTable()
    this.dataTable.titles = this.titles;
    this.dataTable.rows = this.rows

  }
  name: string;
  updateValues(currentParameter: Parameter)
  {
    if (currentParameter != null)
    {
      this.currentParameter = currentParameter;
      this.name = this.currentParameter.parameterName;
      this.updateRows();

    }

  }
  // we should get the id of the pararameter that we want to delete !
  deleteRow(index: number)
  {
    this.index = index;
    this.actionAlert.confirmAlert('',
      'Are you sure want to remove the value ' + this.values[index].value + '?',
      '',
      'Value has been deleted',
      '',
      'Value has not been deleted',
      success =>
      {
        this.values.splice(this.index, 1);
        this.updateRows();
      },
      failure => { }, 'warning'
    )
  }
  // editRow(id:number) :void
  // {

  // }



  AddtoTable(paramInfo: string, paramArrange: number)
  {
    if (paramArrange == 1)
    {
      this.paramName = paramInfo;
    }
    if (paramArrange == 2)
    {
      this.paramDesc = paramInfo;
    }
    if (paramArrange == 3)
    {
      this.paramVal = paramInfo;
      this.valLen = this.paramVal.length;
      if (this.valLen == 0)
      {
        this.buttonConditon = true;
      }
      else
      {
        this.buttonConditon = false;
      }
    }
  }



  addtoParams()
  {
    if ((this.paramVal.length > 0))
    {
      let val = new Value();
      val.value = this.paramVal;
      this.values.push(val);
      this.updateRows();
      this.paramVal = "";
    }
    else
    {

    }
  }

  saveButtonClick()
  {
    var paramValArr: string[] = [];
    var parmsStr: string = "";
    this.values.forEach(element =>
    {
      if (parmsStr != "")
      {
        parmsStr += ","
      }
      parmsStr += element.value
    }

    )
    if (this.paramName !== "")
    {
      if (this.currentParameter == null)
      {

        this.Param.addNewParam(this.paramName, this.paramDesc, parmsStr).subscribe(() =>
        {
          this.actionAlert.alertWithCallback("The param has been added successfully!", 2500, false,()=>{
            this.route.navigate(["/dell/config/testConfiguration"]);
          }, 'center', 'success');
        }
          , (err) =>
          {
            this.actionAlert.alert("Problem in adding parameter!", 2500, false, 'center', 'error');
          });

      }
      else
      {
        let obs = this.Param.updateParam(this.currentParameter.id, this.paramName, this.paramDesc, parmsStr).subscribe(() =>
        {
          this.actionAlert.alertWithCallback("The param has been updated successfully!", 2500, false,()=>{
            this.route.navigate(["/dell/config/testConfiguration"]);
          }, 'center', 'success');

        }
          , (err) =>
          {
            this.actionAlert.alert("Problem in parameter updating  !", 2500, false, 'center', 'error');

          });
      }

    }
    if (this.paramName == "" && this.currentParameter == null)
    {
      this.actionAlert.alert("You must enter a name  !", 2500, false, 'center', 'error');

    }
  }
  cleanEverything()
  {
    this.currentParameter = null;
    this.paramName = "";
    this.paramDesc = "";
    this.paramVal = "";
    this.values = [];
    this.updateRows();
    if (this.currentParameter == null && this.paramName == "")
    {
      this.backtoParms();
    }
  }
  backtoParms()
  {
    this.route.navigate(["/dell/config/testConfiguration"]);

  }

}


function warning(arg0: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string, arg6: (success: any) => void, arg7: (failure: any) => void, warning: any) {
  throw new Error('Function not implemented.');
}

