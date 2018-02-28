import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../elements/registration';
import { User } from '../elements/user';

@Injectable()
export class RegistrationService {

  reservation: Registration = new Registration();

  constructor(private http: HttpClient) { }

  addUserByName(name: string): void {
    if (name) {
      this.reservation.addUser(new User(name));
    }
  }

  addUnavailableUserByName(name: string): void {
    if (name) {
      this.reservation.addUnavailableUser(new User(name));
    }
  }

  getAvailableUsers(): User[] {
    return this.reservation.getAvailableUsers();
  }

  getUnavailableUsers(): User[] {
    return this.reservation.getUnavailableUsers();
  }

  deleteAvailableUser(name: string): void {
    this.reservation.deleteAvailableUserByName(name);
  }

  deleteUnavailableUser(name: string): void {
    this.reservation.deleteUnavailableUserByName(name);
  }

  putUserOnStandbyByName(name: string): void {
    this.reservation.putUserOnStandbyByName(name);
  }


}
