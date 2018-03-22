import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  selectedUserName: string;

  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
    this.registrationService.getUserSelectedObservable().subscribe((user) => {
      this.selectedUserName = user;
    })
   }

  ngOnInit() {
  }

  addParticipatingUser(name: String): void {
    if (name) {
      this.registrationService.addParticipatinUser(String(name));
    }
  }

  addUncertainUser(name: String): void {
    if (name) {
      this.registrationService.addUncertainUser(String(name));
    }
  }

  addUnavailableUser(name: String): void {
    if (name) {
      this.registrationService.addUnavailableUser(String(name));
    }
  }

}
