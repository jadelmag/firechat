import { Injectable } from '@angular/core';

// Firebase 2
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { User } from '../interfaces/user.interface';
import { ChatService } from './chat.service';


@Injectable()
export class UsersConnectedService {

  private itemsCollection: AngularFirestoreCollection<User>;
  users: User[] = [];

  constructor( private afs: AngularFirestore ) { }

  loadUsers() {

    this.itemsCollection = this.afs.collection<User>('users', ref => ref.where('isConnected', '==', true) );
    return this.itemsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          // console.log(a);
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          data.id = id;
          return data;
      });
    });

    // return this.itemsCollection.valueChanges()
    // .map( (users: any)  => {
    //   // console.log('users: ', users);
    //   return users;
    // });

  }

  addUser( name: string, email: string, uid: string ) {

    const newUser: User = {
        name: name,
        email: email,
        isConnected: true,
        uid: uid
    };

    return this.itemsCollection.add(newUser);

  }

  removeUser( uid: string ) {

    for (const user of this.users) {
      if ( user.uid === uid ) {
        return this.itemsCollection.doc(user.id).delete();
      }
    }
  }


}
