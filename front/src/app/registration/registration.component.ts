import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { RegistrationHttpService } from './registration-http.service'
import { Registration } from '../elements/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService,
    private registrationHttpService: RegistrationHttpService) {
    this.registrationService = registrationService;
    this.registrationHttpService = registrationHttpService;
  }

  ngOnInit() {
    this.registrationHttpService.getRegistrationNext()
      .subscribe(response => {
        if (response.status && response.status === 200) {
          this.registrationService.setRegistration(response.registration);
        }
      });
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

}
