import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebServiseService } from './WebService/web-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private webService:WebServiseService) { }

  filedownloadAssync(filename:string): string{
    let map =new Map<string,any>();
    map.set("fileName",filename);
    return this.webService.download("/TestConfiguration/getFile",map);
  }
}
