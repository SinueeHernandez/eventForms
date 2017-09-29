import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdGridListModule, MdInputModule} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdGridListModule, MdInputModule],
  exports: [MdButtonModule, MdCheckboxModule, MdGridListModule, MdInputModule],
})
export class CustomMaterialModule { }