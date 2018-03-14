import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  @Input() selectedUserName: string;

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
   }

  ngOnInit() {
  }

  addUser(name: String): void {
    if (name) {
      this.registrationService.addUser(String(name));
    }
  }

  putUserOnStandby(name: String): void {
    if (name) {
      this.registrationService.putUserOnStandby(String(name));
    }
  }

  addUnavailableUser(name: String): void {
    if (name) {
      this.registrationService.addUnavailableUser(String(name));
    }
  }

}
