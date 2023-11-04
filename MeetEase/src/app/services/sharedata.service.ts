import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  constructor() {}
  sharedData: any;

  updateData(data: any) {
    this.sharedData = data;
  }
}
