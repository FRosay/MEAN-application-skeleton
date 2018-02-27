import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }

  create() {

  }

  getAll() {
    this.http.get("localhost:3000/api/registration/all")
      .subscribe(data => {
        console.log(data)
      });
  }

}
