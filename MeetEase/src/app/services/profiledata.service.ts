import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfiledataService {

  name!: string;
  age!: number;
  gender!: string;
  email!: string;

  constructor() { }
}
