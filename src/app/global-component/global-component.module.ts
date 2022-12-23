import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavBarComponent,
    SearchBarComponent
  ]
})
export class GlobalComponentModule { }
