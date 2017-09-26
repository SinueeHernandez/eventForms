import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sinuee Hello Angular';
  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  messages: FirebaseListObservable<any>;
  sizeSubject: Subject<any>;
  user: Observable<firebase.User>;
  email: string;
  password: string;
  loged: boolean;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.email = '';
    this.password = '';
    this.user = afAuth.authState;
    if (this.user != null)
      this.loadData();
  }
  loadData() {
    this.messages = this.db.list('/messages');
    this.sizeSubject = new Subject();
    this.items = this.db.list('/items', {
      query: {
        orderByChild: 'size',
        equalTo: this.sizeSubject
      }
    });
  }
  addItem(newName: string) {
    this.messages.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.messages.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.messages.remove(key);
  }
  deleteEverything() {
    this.messages.remove();
  }
  filterBy(size: string) {
    this.sizeSubject.next(size);
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      //.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      .then(result => {
        this.email = '';
        this.password = '';
        this.loged = true;
        this.loadData();
      })
      .catch(err => {
        let errorMessage = err.message;
        alert(errorMessage);
        console.log(err);
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(result =>{
      this.loged = false;
      this.loadData();
    });
  }

  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error['code'];
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
}
