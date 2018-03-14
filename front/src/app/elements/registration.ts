export class Registration {
    id: string;
    date: Date;
    end_at: Date;
    liste_participants: string[];
    liste_absents: string[];
    liste_incertains: string[];

    constructor(id= null,
        liste_absents:string[] = [],
        list_participants:string[] = [],
        liste_incertains:string[] = [],
        end_at:string = null,
        date:string = null) {
        this.id = id;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;
        this.end_at = new Date(end_at.toString());
        this.date = new Date(date.toString());
    }

    addUser(user: string) {
        this.deleteFromLists(user);
        this.liste_participants.push(user);
    }

    addUnavailableUser(user: string): void {
        this.deleteFromLists(user);
        this.liste_absents.push(user);
    }

    addUncertainUser(user: string): void {
        this.deleteFromLists(user);
        this.liste_incertains.push(user);
    }

    deleteFromLists(user: string) : void {
        this.deleteAvailableUserByName(user);
        this.deleteUnavailableUserByName(user);
        this.deleteUncertainUserByName(user);
    }

    deleteAvailableUserByName(name: string): void {
        this.liste_participants = this.liste_participants.filter((user) =>
            user !== name);
    }

    deleteUncertainUserByName(name: string): void {
        this.liste_incertains = this.liste_incertains.filter((user) =>
            user !== name);
    }

    deleteUnavailableUserByName(name: string): void {
        this.liste_absents = this.liste_absents.filter((user) => 
            user !== name);
    }

}