import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../../elements/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
  }

  ngOnInit() {
  }

  getAvailableUsers(): User[] {
    return this.registrationService.getAvailableUsers();
  }

  getUncertainUsers(): User[] {
    return this.registrationService.getUncertainUsers();
  }

  getUnavailableUsers(): User[] {
    return this.registrationService.getUnavailableUsers();
  }

  deleteAvailableUser(name: string) {
    this.registrationService.deleteAvailableUser(name);
  }

  deleteUncertainUser(name: string) {
    this.registrationService.deleteUncertainUser(name);
  }
  
  deleteUnavailableUser(name: string) {
    this.registrationService.deleteUnavailableUser(name);
  }

}