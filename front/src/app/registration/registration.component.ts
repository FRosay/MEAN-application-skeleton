import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { User } from '../elements/user';
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

   /* this.registrationHttpService.getRegistrationNext()
      .subscribe(data => {
        console.log(data);
        if (data.registration) {
          this.registrationService.setRegistration(data.registration)
        } else {
          this.registrationHttpService.createRegistration(new Registration())
          .subscribe(data => {
            this.registrationService.setRegistration(data.registration)
          })
        }
      });*/
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
