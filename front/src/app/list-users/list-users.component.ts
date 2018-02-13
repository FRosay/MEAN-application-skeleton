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

  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  deleteUser(name: string) {
    this.usersService.deleteUser(name);
  }


}
