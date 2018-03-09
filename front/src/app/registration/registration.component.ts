import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Registration } from '../elements/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService;
  }

  ngOnInit() {
    this.registrationService.getRegistrationNext()
      .then((registration) => {
        this.registrationService.setRegistration(registration);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  serviceAvailable(): Boolean {
    return this.registrationService.isAvailable();
  }

  getRegistrationDate(): Date {
    return this.registrationService.getRegistrationDate();
  }

  getRegistrationEndDate(): Date {
    return this.registrationService.getRegistrationEndAt();
  }

  getAvailableUsers(): String[] {
    return this.registrationService.getAvailableUsers();
  }

  getUncertainUsers(): String[] {
    return this.registrationService.getUncertainUsers();
  }

  getUnavailableUsers(): String[] {
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
