import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
   }

  ngOnInit() {
  }

  addUser(name: string): void {
    if (name) {
      this.registrationService.addUser(name);
    }
  }

  putUserOnStandby(name: string): void {
    if (name) {
      this.registrationService.putUserOnStandby(name);
    }
  }

  addUnavailableUser(name: string): void {
    if (name) {
      this.registrationService.deleteUnavailableUser(name);
      this.registrationService.deleteAvailableUser(name);
      this.registrationService.addUnavailableUser(name);
    }
  }

}
