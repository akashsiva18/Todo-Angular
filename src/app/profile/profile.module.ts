import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
