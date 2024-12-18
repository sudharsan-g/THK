import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private commonSubject  = new BehaviorSubject('');
  public commonMessage = this.commonSubject.asObservable();
  sendData(data:any){
    this.commonSubject.next(data);
  }
  constructor() { }
}
