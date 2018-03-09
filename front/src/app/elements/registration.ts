export class Registration {
    id: string;
    date: Date;
    end_at: Date;
    liste_participants: String[];
    liste_absents: String[];
    liste_incertains: String[];

    constructor(id= null,
        liste_absents:String[] = [],
        list_participants:String[] = [],
        liste_incertains:String[] = [],
        end_at:String = null,
        date:String = null) {
        this.id = id;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;
        this.end_at = new Date(end_at.toString());
        this.date = new Date(date.toString());
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