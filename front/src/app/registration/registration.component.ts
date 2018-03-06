import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { User } from '../elements/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

  

}
