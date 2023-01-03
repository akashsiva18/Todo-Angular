import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    SettingComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    NavBarComponent,
    SearchBarComponent,
    SettingComponent
  ]
})
export class GlobalComponentModule { }
