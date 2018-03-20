export class Transaction {
    id: string;
    from: string;
    to: string;
    val: number;

    constructor(id=null, from="", to="", val=0) {
        this.id=id;
        this.from=from;
        this.to=to;
        this.val=val;
    }
    
}