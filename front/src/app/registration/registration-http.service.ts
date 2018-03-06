import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../elements/registration';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()

export class RegistrationHttpService {

  private registration_url = "http://localhost:3000/api/registration";

  constructor(
    private http: HttpClient) { }

  getRegistrationNext() {
    return this.http.get<any>(this.registration_url + "/next")
  }

  updateRegistration(registration: Registration): Observable<Registration> {
    return null;
  }

  createRegistration(registration: Registration) {
    return this.http.post<any>(this.registration_url + "/new", {registration: registration})
  }

}

