import { User } from './user'

export class Registration {
    date: Date;
    liste_participants: User[];
    liste_absents: User[];
    joueur_en_attente: User;

    constructor() {
        this.liste_absents = [];
        this.liste_participants = [];
    }

    addUser(user: User) {
        this.deleteAvailableUserByName(user.name);
        this.deleteUnavailableUserByName(user.name);
        this.liste_participants.push(user);
    }

    addUnavailableUser(user: User): void {
        this.deleteAvailableUserByName(name);
        this.deleteUnavailableUserByName(name);
        this.liste_absents.push(user);
    }

    getAvailableUsers(): User[] {
        return this.liste_participants;
    }

    getUnavailableUsers(): User[] {
        return this.liste_absents;
    }

    deleteAvailableUserByName(name: string): void {
        this.liste_participants = this.liste_participants.filter(function (user) {
            return user.name !== name;
        });
    }

    deleteUnavailableUserByName(name: string): void {
        this.liste_absents = this.liste_absents.filter(function (user) {
            return user.name !== name;
        });
    }

    putUserOnStandbyByName(name: string): void {
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