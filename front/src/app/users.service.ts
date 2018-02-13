import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UsersService {

  users:User[];

  constructor() {
    this.users = [];
  }

  addUser (user:User): void {
    this.users.push(user);
  } 

  getUsers (): User[] {
    return this.users;
  }

  deleteUser (name: string): void {
    this.users = this.users.filter(function(user) {
      return user.name !== name;
    });
  }

}
