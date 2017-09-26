import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

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

  constructor(db: AngularFireDatabase) {
    this.messages = db.list('/messages');
    this.sizeSubject = new Subject();
    this.items = db.list('/items', {
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
}
