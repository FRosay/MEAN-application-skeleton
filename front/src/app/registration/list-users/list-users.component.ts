import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../../elements/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() user_list: User[];

  ngOnInit() {
  }

  deleteUserFromList(name: string): void {
    this.user_list = this.user_list.filter((user) => user.name !== name);
  }
  
}