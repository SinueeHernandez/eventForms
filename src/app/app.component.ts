import { Component, ViewChild, ElementRef, Renderer,OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MdButtonModule, MdCheckboxModule, MdGridListModule, MdInputModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Sinuee Hello Angular';
  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  messages: FirebaseListObservable<any>;
  sizeSubject: Subject<any>;
  user: Observable<firebase.User>;
  email: string;
  password: string;
  loged: boolean;
  fieldElements: Array<FormElement>;

  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

//   injectHtml = `<form class="example-form">
//   <md-form-field class="example-full-width">
//     <input mdInput placeholder="State" aria-label="State" [mdAutocomplete]="auto" [formControl]="stateCtrl">
//     <md-autocomplete #auto="mdAutocomplete">
//       <md-option *ngFor="let state of filteredStates | async" [value]="state.name">
//         <img style="vertical-align:middle;" aria-hidden src="{{state.flag}}" height="25" />
//         <span>{{ state.name }}</span> |
//         <small>Population: {{state.population}}</small>
//       </md-option>
//     </md-autocomplete>
//   </md-form-field>

//   <br />

//   <md-slide-toggle
//     [checked]="stateCtrl.disabled"
//     (change)="stateCtrl.disabled ? stateCtrl.enable() : stateCtrl.disable()">
//     Disable Input?
//   </md-slide-toggle>
// </form>`;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private elementRef:ElementRef,
    private renderer:Renderer
  ) {
    this.email = '';
    this.password = '';
    this.user = afAuth.authState;
    if (this.user != null)
      this.loadData();

    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.states.slice());

    this.fieldElements = new Array<FormElement>();
    this.fieldElements.push(new FormElement());
    this.fieldElements.push(new FormElement());
    this.fieldElements.push(new FormElement());
  }

ngOnInit(){
  // var d1 = this.elementRef.nativeElement.querySelector('.formHere');
  // d1.insertAdjacentHTML('beforeend', this.injectHtml);
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
    this.afAuth.auth.signOut().then(result => {
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

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  // injectHtmlToDocument() {
  //   var d1 = this.elementRef.nativeElement.querySelector('.formHere');
  //  d1.insertAdjacentHTML('beforeend', this.injectHtml);
  //  //this.renderer.invokeElementMethod(d1.nativeElement, 'insertAdjacentHTML' ['beforeend', '<div class="two">two</div>']) 

  // }
}

export class FormElement {
  type: string;
  label: string;
  value: FormControl;
  constructor(){
    this.type = 'Autocomplete';
    this.label = 'This is an Autocomplete';
    this.value = new FormControl();
    this.value.setValue('hola');
  }
}
