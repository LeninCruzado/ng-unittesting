import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  greetings(): any {
    return 'Hello World_!!';
  }

}
