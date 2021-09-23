import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable } from 'rxjs';
import { Parameter } from '../../models/Parameter';
import { ParamList } from '../../models/ParmList';

import { Product } from '../../models/Product';
import { Value } from '../../models/Value';
import { WebServiseService } from '../WebService/web-service.service';

@Injectable({
  providedIn: 'root'
})
export class ParameterService
{
  deleteProductParam(productId: number, paramId: number)
  {
    let map = new Map<string,any>();
    map.set("productId", productId).set("paramId", paramId);

    return this.webService.delete<boolean>("Parameter/deleteProductParam", map);
  }

  parameters: Parameter[];
  constructor(private webService: WebServiseService) 
  {
    this.parameters = this.generateDummyParams();
  }



  public getAllParameters(): Observable<Parameter[]>
  {
    return this.webService.get<Parameter[]>("Parameter/getAllParameters", null);
  }
  public getAllParametersByProductId(productId: number): Observable<Parameter[]>
  {
    const parMap = new Map([["productId", productId]]);
    return this.webService.get<Parameter[]>("Parameter/getAllParametersByProductId", parMap);
  }

  public deleteParameter(id: number)
  {
    let newParm = new Map<string,any>();
    newParm.set("paramId", id)

    return this.webService.delete<boolean>("Parameter/deleteParam", newParm);
  }

  public addNewParam(paramName: string, paramDesc: string, paramlist: string):  Observable<boolean>
  {
    var newParm = new Map<string,any>();


    newParm.set("paramDescription", paramDesc).set("paramName", paramName).set("paramValues",  paramlist);


    return this.webService.get<boolean>("Parameter/addNewParam", newParm);
  }

  public updateParam(id: number, newName: string, paramDesc: string, paramVal: string)
  {
    let newParm = new Map<string,any>();

    newParm.set("paramId", id)
    .set("paramName", newName)
    .set("paramDescription", paramDesc)
    .set("paramValues", paramVal);
    
    return this.webService.put<Parameter[]>("Parameter/updateParam", newParm);

  }



  public addParam(parameterName: string, description: string, value: string)
  {
    const val = new Value(value);
    const num = this.parameters.length;
    const vals: Value[] = [];
    vals.push(val);
    const parameter = new Parameter(this.parameters.length, parameterName, description, vals,
      null);

    this.parameters.push(parameter);
  }

  public getAllParametersByIdsAsync(ids:number[]): Observable<Parameter[]>
 
  {
    let parMap = new Map<string,any>();
    parMap.set("parameterIds",ids);
    return this.webService.get<Parameter[]>("Parameter/getAllParametersByIds",parMap);
  }
   


  private generateDummyParams(): Parameter[]
  {
    const ramValue1 = new Value("4GB");
    const ramValue2 = new Value("8GB");
    const ramValue3 = new Value("16GB");
    const ramValues: Value[] = [ramValue1, ramValue2, ramValue3];
    const parameter1 = new Parameter(1, "RAM", "The memory of the computer.", ramValues,
      [new Product(2, "B", true, null), new Product(1, "A", true, null)]);

    const gpuValue1 = new Value("GTX 1050");
    const gpuValue2 = new Value("GTX 3070");
    const gpuValue3 = new Value("GTX 3090");
    const gpuValue4 = new Value("None");
    const gpuValues: Value[] = [gpuValue1, gpuValue2, gpuValue3, gpuValue4];
    const parameter2 = new Parameter(2, "GPU", "The graphics processing unit.", gpuValues,
      [new Product(1, "A", true, null)]);


    const cpuValue1 = new Value("4 cores");
    const cpuValue2 = new Value("8 cores");
    const cpuValues = [cpuValue1, cpuValue2];
    const parameter3 = new Parameter(3, "CPU", "Number of cores", cpuValues,
      [new Product(1, "A", true, null), new Product(2, "B", true, null)]);

    let parameters = [parameter1, parameter2, parameter3];
    return parameters;
  }

  public getDummyParameters(): Observable<Parameter[]>
  {
    let obs = new Observable<Parameter[]>(observer => 
    {
      try
      {
        setTimeout(() =>
        {
          observer.next(this.parameters);
        }, 500);

      } catch (error)
      {
        observer.error(error);
      }
    });
    return obs;
  }

  public deleteDummyProductFromParam(param: Parameter, product: Product)
  {
    param.products.splice(param.products.indexOf(product), 1);
  }
  public getDummyParamsById(productId: number): Observable<Parameter[]>
  {
    let obs = new Observable<Parameter[]>(observer => 
    {
      setTimeout(() =>
      {
        let paramsById: Parameter[] = [];
        try
        {
          this.parameters.forEach(element =>
          {
            element.products.forEach(product =>
            {
              // console.log("product=" + product.id + " - Id=" + productId);
              if (product.id == productId)
              {
                // console.log("Match, added " + product.toString());
                paramsById.push(element);
              }
            });

          });
          observer.next(paramsById);
        }
        catch (error)
        {
          observer.error(error);
        }
      }, 500);
    });
    return obs;
  }

}
