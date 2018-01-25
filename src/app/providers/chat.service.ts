import { Injectable } from '@angular/core';

// Firebase 2
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

//  Authentication
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Message } from '../interfaces/message.interface';

// Service
import { UsersConnectedService } from '../providers/users-connected.service';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];

  public user: any = {};

  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth, public _usersConnectedService: UsersConnectedService ) {
    this.afAuth.authState.subscribe( user => {
      if (!user) {
        return null;
      } else {
        this.user.name = user.displayName;
        this.user.uid = user.uid;
      }
    });
  }

  login( provider: string ) {
    if ( provider === 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then( (res: any) => {
          // console.log('login google: ', res);

          this._usersConnectedService.addUser( res.user.displayName, res.user.email, res.user.uid )
            .then( (response) => {
              console.log('user added!');
            })
            .catch( (err) => {
              console.log('login error: ', err);
            });

        })
        .catch( (err) => {
          console.log('Error login: ', err);
        });
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then( (res: any) => {
          // console.log('Twitter: ', res);

          this._usersConnectedService.addUser( res.user.displayName, res.user.email, res.user.uid )
            .then( (response) => {
              console.log('user added');
            })
            .catch( (err) => {
              console.log('login error: ', err);
            });

        })
        .catch( (err) => {
          console.log('Twitter error: ', err );
        });
    }
  }

  logout() {
    this._usersConnectedService.removeUser(this.user.uid);
    this.user = {};
    this.afAuth.auth.signOut();
  }


  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(10) );
    return this.itemsCollection.valueChanges()
            .map( (messages: Message[]) => {
              this.chats = [];

              for (const message of messages) {
                this.chats.unshift( message );
              }

              return this.chats;
            });
  }

  sendMessage(item: Message) {
    this.itemsCollection.add(item);
  }

  addMessage( text: string ) {

    const message: Message = {
      uid: this.user.uid,
      name: this.user.name,
      message: text,
      date: new Date().getTime()
    };

    return this.itemsCollection.add( message );
  }

}
