import { Injectable } from '@angular/core';
import { Transaction } from './element/transaction';

@Injectable()
export class TransactionhttpService {

  constructor() { }

  createTransaction(transaction: Transaction) {
    console.log("ok");
  }

  getUserMoneyCount(transaction: Transaction) {
    return [
      {user: "toto", val: 10},
      {user: "tata", val: -5},
      {user: "titi", val: -5},
    ]
  }


}
