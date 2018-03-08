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

  getRegistrationNext() : Observable<any>{
    return this.http.get<any>(this.registration_url + "/next")
  }

  updateRegistration(registration: Registration): Observable<any> {
    return this.http.put<any>(this.registration_url + "/update", {registration:
    {
      _id: registration.id,
      participants: registration.liste_participants,
      not_participants: registration.liste_absents,
      uncertains: registration.liste_incertains
    }})
  }

}

