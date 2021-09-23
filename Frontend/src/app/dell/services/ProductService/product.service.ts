import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';
import { Release } from '../../models/Release';
import { ReleaseValue } from '../../models/ReleaseValue';
import { User } from '../../models/User';
import { WebServiseService } from '../WebService/web-service.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
  constructor(private webService: WebServiseService, private httpClient: HttpClient) { }

  public getDummyProducts(): Observable<Product[]> {
    let obs = new Observable<Product[]>(observer => {
      try {
        setTimeout(() => {
          // const release1 = new Release(1, "A", false, "1.0");
          // const release2 = new Release(2, "B", false, "1.2");
          // const release3 = new Release(3, "C", false, "3.0");
          // const release4 = new Release(4, "D", true, "4.0");
          // const release5 = new Release(5, "E", false, "5.2");
          // const user1 = new User(1, "abdjat@gmail.com", "abed", "1234567", "50351711", true, "admin");
          // const user2 = new User(2, "ahmad@gmail.com", "ahmad", "1234567", "05266152", true, "user");
          // const user3 = new User(3, "saleh@gmail.com", "saleh", "1234567", "8466214", true, "configurator");
          // const user4 = new User(4, "majd@gmail.com", "majd", "1234567", "02255481", false, "user");
          // const user5 = new User(5, "rami@gmail.com", "rami", "1234567", "036251425", true, "configurator");
          // const user6 = new User(6, "xoxo@gmail.com", "xoxo", "1234567", "82541522", true, "user");

          // const releases: Release[] = [release1, release2, release3, release4, release5];
          // const releases3: Release[] = [release1, release3];
          // const users: User[] = [user1, user3, user5];
          // const users1: User[] = [user2, user4, user6];

          // const product1 = new Product(1, "Dell PC", true, releases3, users);
          // const product2 = new Product(2, "Dell Laptop", true, releases, users1);
          // const products: Product[] = [product1, product2];
          // observer.next(products);
        }, 500);

      } catch (error) {
        observer.error(error);
      }
    });
    return obs;
  }

  public addProduct(name: String, status: boolean): Observable<boolean> {
    let data = new Map<string, any>();
    data.set("name", name);
    data.set("status", status);

    return this.webService.postBool<boolean>("Product/addProduct", data,true);
  }

  public deleteProduct(ProductId: number): Observable<boolean> {
    let data = new Map<string, any>();
    data.set("productId", ProductId);
    return this.webService.delete<boolean>("Product/deleteProduct", data);
  }

  getProductByName(productName: string): Observable<Product>
  {
    let data = new Map<string, any>();
    data.set("productName", productName);
    return this.webService.get<Product>("Product/getProductByName", data);
  }
  public getAllProducts(): Observable<Product[]> {
    return this.webService.get<Product[]>("Product/getAllProducts", null);
  }

  public getAllReleases(id: number): Observable<Release[]> {
    const relMap = new Map([["productId", id]]);
    return this.webService.get<Release[]>("Release/getAllReleases", relMap);
  }
  public getAllReleasesWithoutParameter():Observable<Product[]>{
    const relWithoutParam=new Map();
    return this.webService.get<Product[]>("ReleaseValues/getAllReleasesWithoutParameter",relWithoutParam);


  }

  public getAllUsers(id: number): Observable<User[]> {
    const userMap = new Map([["productId", id]]);
    return this.webService.get<User[]>("Product/getAllUsers", userMap);
  }

  public getAllUsersNotInProduct(id: number): Observable<User[]> {
    const userMap = new Map([["id", id]]);
    return this.webService.get<User[]>("Product/getAllUsersNotInProduct", userMap);
  }

  public updateProduct(name: string, id: number, status: boolean): Observable<boolean> {
    const newProduct = new Map();
    newProduct.set("name", name);
    newProduct.set("productId", id);
    newProduct.set("status", status);
    return this.webService.put<boolean>("Product/updateProduct", newProduct);

  }

  public updateProductUserList(productId: number, userList: User[]): Observable<boolean> {
    let data = new Map<string, any>();
    let userIds: number[] = [];
    for (let i = 0; i < userList.length; i++) {
      userIds.push(userList[i].id);
    }
    data.set("productId", productId).set("userIds",JSON.stringify(userIds));
    return this.webService.put<boolean>("Product/updateProductUsersList", data);
  }

  public addNewRelease(id: number, newrelease: Release): Observable<boolean> {
    let data = new Map<string, any>();
    data.set("productId", id)
      .set("releaseName", newrelease.releaseName)
      .set("status", newrelease.status)
      .set("version", newrelease.version);

    return this.webService.postBool<boolean>("Release/addNewRelease", data, true);
  }
  public updateRelease(id: number, newrelease: Release): Observable<boolean> {
    const newRelease = new Map<string, any>();
    newRelease.set("productId", id)
      .set("releaseId", newrelease.id)
      .set("releaseName", newrelease.releaseName)
      .set("status", newrelease.status)
      .set("version", newrelease.version);
    // alert("success");
    // console.log(newRelease);
    return this.webService.put<boolean>("Release/updateRelease", newRelease);
  }

  public checkSameRelease(currentProduct: Product, tempRelease: Release): Boolean {
    let x: boolean = false;
    if (currentProduct.releases == null) return false;
    currentProduct.releases.forEach(rel => {
      if (rel.releaseName === tempRelease.releaseName && rel.version === tempRelease.version) {
        x = true;
      }
    });
    return x;
  }

  public updateReleaseValues(releaseValues: ReleaseValue[]): Observable<boolean> {
    let data = new Map<string, any>();
    data.set("releaseValue", releaseValues);
    // alert(JSON.stringify(releaseValues))
    // return this.webService.post<boolean>("ReleaseValues/addValueReleases",data);
    return this.webService.postJSON<boolean>("ReleaseValues/addValueReleases",JSON.stringify(releaseValues));
  }

  /**
   * CHECK IF THIS MATCHES THE API WHEN ITS DONE!
   */
  public getReleaseValues(productId: number, paramId: number): Observable<ReleaseValue[]> {
    let data = new Map<string, any>();
    data.set("paramId", paramId);
    data.set("productId", productId);
    return this.webService.get<ReleaseValue[]>("ReleaseValues/getValueReleases", data);
  }
}
