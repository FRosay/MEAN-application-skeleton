import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  @Input() selectedUserName: String;

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
   }

  ngOnInit() {
  }

  addUser(name: string): void {
    if (name) {
      console.log(this.selectedUserName);
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
      this.registrationService.addUnavailableUser(name);
    }
  }

}
