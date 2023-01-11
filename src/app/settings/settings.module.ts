import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    SettingComponent
  ]
})
export class SettingsModule { }
