import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parameter } from '../../models/Parameter';
import { Product } from '../../models/Product';
import { Release } from '../../models/Release';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  private productSource = new BehaviorSubject<Product>(null);
  currentProduct = this.productSource.asObservable();
  private parameterSource = new BehaviorSubject<Parameter>(null);
  currentParameter = this.parameterSource.asObservable();
  private releasesSource=new BehaviorSubject<Release>(null);
  currentRelease= this.releasesSource.asObservable();
  constructor() { }


  changeProduct(product : Product)
  {
    this.productSource.next(product);
  }
  changeParameter(parameter : Parameter)
  {
    this.parameterSource.next(parameter);
  }
  changeRelease(release : Release)
  {
    this.releasesSource.next(release);
  }
}
