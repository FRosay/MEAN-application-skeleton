import { Injectable } from '@angular/core';
import { Registration } from './element/registration';
import { RegistrationHttpService } from './registration-http.service';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {

  registration: Registration;
  userSelectedSubject: Subject<string>;


  constructor(private registrationHttpService: RegistrationHttpService) {
    this.registrationHttpService = registrationHttpService;
    this.userSelectedSubject = new Subject<string>();
  }

  getUserSelectedObservable() : Observable<string> {
    return this.userSelectedSubject.asObservable()
  }

  updateSelectedUser(user) {
    this.userSelectedSubject.next(user);
  }

  isAvailable() : Boolean {
    return this.registration !== null && this.registration !== undefined;
  }

  getRegistrationNext(): Promise<Registration> {
    return this.registrationHttpService.getRegistrationNext();
  }

  getRegistrationDate(): Date {
    if (this.registration) {
      return this.registration.date;
    }
  }

  getRegistrationEndAt(): Date {
    if (this.registration) {
      return this.registration.end_date;
    }
  }

  addParticipatinUser(name: string): void {
    if (name && this.registration) {
      this.registration.addUser(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  addUnavailableUser(name: string): void {
    if (name && this.registration) {
      this.registration.addUnavailableUser(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  addUncertainUser(name: string): void {
    if (name && this.registration) {
      this.registration.addUncertainUser(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  getAvailableUsers(): string[] {
    if (this.registration) {
      return this.registration.liste_participants;
    }
  }

  getUncertainUsers(): String[] {
    if (this.registration) {
      return this.registration.liste_incertains;
    }
  }

  getUnavailableUsers(): String[] {
    if (this.registration) {
      return this.registration.liste_absents;
    }
  }

  deleteAvailableUser(name: string): void {
    if (name && this.registration) {
      this.registration.deleteAvailableUserByName(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  deleteUncertainUser(name: string): void {
    if (name && this.registration) {
      this.registration.deleteUncertainUserByName(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  deleteUnavailableUser(name: string): void {
    if (name && this.registration) {
      this.registration.deleteUnavailableUserByName(name);
      this.registrationHttpService.updateRegistration(this.registration);
    }
  }

  setRegistration(registrationData: any) {
    this.registration = new Registration(
      registrationData._id,
      registrationData.not_participants,
      registrationData.participants,
      registrationData.uncertains,
      registrationData.end_date,
      registrationData.date,
      registrationData.registration_limit_date
    );
  }

}