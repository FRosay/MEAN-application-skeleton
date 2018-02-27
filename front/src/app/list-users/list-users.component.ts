import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private usersService: UsersService) {
    this.usersService = usersService
  }

  ngOnInit() {
  }

  getAvailableUsers(): User[] {
    return this.usersService.getAvailableUsers();
  }

  getUnavailableUsers(): User[] {
    return this.usersService.getUnavailableUsers();
  }

  deleteAvailableUser(name: string) {
    this.usersService.deleteAvailableUser(name);
  }

  deleteUnavailableUser(name: string) {
    this.usersService.deleteUnavailableUser(name);
  }

}