import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../elements/registration';
@Injectable()
export class RegistrationHttpService {

  private registration_url = "http://localhost:3000/api/registration";

  constructor(
    private http: HttpClient) { }

    getRegistrations(): Observable<Registration[]> {
        return null;
    }

    updateRegistration(): Observable<Registration> {
      return null;

    }

    createRegistration(): Observable<Registration> {
      return null;
    }

    deleteRegistration(): void {
      return null;
    }
    
}

