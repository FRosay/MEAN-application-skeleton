export class Registration {
    id: string;
    date: number;
    end_at: number;
    liste_participants: String[];
    liste_absents: String[];
    liste_incertains: String[];

    constructor(id= null,
        liste_absents = [],
        list_participants = [],
        liste_incertains = [],
        end_at = null,
        date = null) {
        this.id = id;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;
        this.end_at = end_at;
        this.date = date;
    }

    addUser(user: String) {
        this.deleteAvailableUserByName(user);
        this.deleteUnavailableUserByName(user);
        this.deleteUncertainUserByName(user);
        this.liste_participants.push(user);
    }

    addUnavailableUser(user: String): void {
        this.deleteAvailableUserByName(user);
        this.deleteUnavailableUserByName(user);
        this.deleteUncertainUserByName(user);
        this.liste_absents.push(user);
    }

    addUncertainUser(user: String): void {
        this.deleteAvailableUserByName(user);
        this.deleteUnavailableUserByName(user);
        this.deleteUncertainUserByName(user);
        this.liste_incertains.push(user);
    }

    getAvailableUsers(): String[] {
        return this.liste_participants;
    }

    getUncertainUsers(): String[] {
        return this.liste_incertains;
    }

    getUnavailableUsers(): String[] {
        return this.liste_absents;
    }

    deleteAvailableUserByName(name: String): void {
        this.liste_participants = this.liste_participants.filter(function (user) {
            return user !== name;
        });
    }

    deleteUncertainUserByName(name: String): void {
        this.liste_incertains = this.liste_incertains.filter(function (user) {
            return user !== name;
        });
    }

    deleteUnavailableUserByName(name: String): void {
        this.liste_absents = this.liste_absents.filter(function (user) {
            return user !== name;
        });
    }

}