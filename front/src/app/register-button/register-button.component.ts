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
    if (name !== null) {
      this.usersService.addUser(new User(name));
    }
  }

}
