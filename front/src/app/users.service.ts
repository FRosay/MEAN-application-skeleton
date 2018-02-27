import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UsersService {

  liste_participants: User[];
  liste_absents: User[];
  joueur_en_attente: User;

  constructor() {
    this.liste_participants = [];
    this.liste_absents = [];
  }

  addUser(user: User): void {
    this.liste_participants.push(user);
  }

  unavailableUser(user: User): void {
    this.liste_absents.push(user);
  }

  getAvailableUsers(): User[] {
    return this.liste_participants;
  }

  getUnavailableUsers(): User[] {
    return this.liste_absents;
  }

  deleteAvailableUser(name: string): void {
    this.liste_participants = this.liste_participants.filter(function (user) {
      return user.name !== name;
    });
  }

  deleteUnavailableUser(name: string): void {
    this.liste_absents = this.liste_absents.filter(function (user) {
      return user.name !== name;
    });
  }

  putUserOnStandby(name: string): void {
    const waitingUser = new User(name);
    if (!this.joueur_en_attente || this.joueur_en_attente.name === waitingUser.name) {
      this.joueur_en_attente = waitingUser;
    }
    else {
      this.liste_participants.push(waitingUser);
      this.liste_participants.push(this.joueur_en_attente);
      this.joueur_en_attente = null;
    }
  
  }

}
