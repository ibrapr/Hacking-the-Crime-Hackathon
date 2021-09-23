import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebServiseService {
  [x: string]: any;


  readonly ROOT_URL = "https://numbine.herokuapp.com/";

  config = {
    headers: WebServiseService.httpHeaders,
    options: null
  };

  static httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    'Accept': 'application/json'
  });
  constructor(private httpClient: HttpClient) {
  }


  public post<T>(apiRoute: string, data: Map<string, any>): Observable<T> {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    let options = { params: params };
    this.config.options = options;
    // return this.httpClient.post<T>(`${this.ROOT_URL + apiRoute}`,JSON.stringify(params),this.config).pipe(catchError(this.handleError));
    return this.postBool<T>(apiRoute, data, false);
  }
  public postBool<T>(apiRoute: string, data: Map<string, any>, bool: boolean): Observable<T> {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    let options = { params: params };
    this.config.options = options;
    if (bool == true) {
      return this.httpClient.post<T>(`${this.ROOT_URL + apiRoute}` + "?" + params.toString(), {}).pipe(catchError(this.handleError));
    }
    return this.httpClient.post<T>(`${this.ROOT_URL + apiRoute}`, JSON.stringify(params), this.config).pipe(catchError(this.handleError));
  }
  public postJSON<T>(apiRoute: string, data: string): Observable<T> {
    return this.httpClient.post<T>(`${this.ROOT_URL + apiRoute}`, data, this.config).pipe(catchError(this.handleError));
  }

  public get<T>(apiRoute: string, data: Map<string, any>): Observable<T> {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    let options = { params: params };
    this.config.options = options;
    return this.httpClient.get<T>(`${this.ROOT_URL + apiRoute}`, options).pipe(catchError(this.handleError));
  }



  public put<T>(apiRoute: string, data: Map<string, any>): Observable<T> {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    return this.httpClient.put<T>(`${this.ROOT_URL + apiRoute}`, params).pipe(catchError(this.handleError));
  }

  public delete<T>(apiRoute: string, data: Map<string, any>): Observable<T> {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    let options = { params: params };

    return this.httpClient.delete<T>(`${this.ROOT_URL + apiRoute}`, options).pipe(catchError(this.handleError));
  }
  public download(apiRoute: string, data: Map<string, any>): string {
    let params = NumbineHttpParamsGenerator.insertParams(data);
    console.log(this.ROOT_URL + apiRoute + "?" + params.toString())
    return this.ROOT_URL + apiRoute + "?" + params.toString();
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }

}

class NumbineHttpParamsGenerator {
  public static insertParams(map: Map<string, any>) {
    let params = new HttpParams();
    const paramsJson = {};
    if (map != null) {
      for (let [key, value] of map) {
        // value = JSON.stringify(value);
        params = params.append(key, value);
        paramsJson[key] = value;
      }
    }
    return params;
  }
}

function webService<T>(arg0: string, params: HttpParams, webService: any) {
  throw new Error('Function not implemented.');
}

