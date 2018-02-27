import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  constructor(private usersService: UsersService) {
    this.usersService = usersService
   }

  ngOnInit() {
  }

  addUser(name: string): void {
    if (name) {
      this.usersService.deleteAvailableUser(name);
      this.usersService.deleteUnavailableUser(name);
      this.usersService.addUser(new User(name));
    }
  }

  putUserOnStandby(name: string): void {
    if (name) {
      this.usersService.putUserOnStandby(name);
    }
  }

  unavailableUser(name: string): void {
    if (name) {
      this.usersService.deleteUnavailableUser(name);
      this.usersService.deleteAvailableUser(name);
      this.usersService.unavailableUser(new User(name));
    }
  }

}
