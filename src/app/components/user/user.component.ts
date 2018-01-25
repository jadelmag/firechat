import { Component, OnInit } from '@angular/core';

import { UsersConnectedService } from '../../providers/users-connected.service';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor( public _usersConnectedService: UsersConnectedService ) { }

  ngOnInit() {
    this._usersConnectedService.loadUsers().subscribe( (users: any) => {
      this.users = users;
      this._usersConnectedService.users = this.users;
      // console.log(users);
    });
  }

}
