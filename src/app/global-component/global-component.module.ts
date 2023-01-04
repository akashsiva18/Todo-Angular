import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';
import { AppRoutingModule } from '../app-routing.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    SettingComponent,
    HelpComponent,
    AnnouncementComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    NavBarComponent,
    SearchBarComponent,
    SettingComponent,
    HelpComponent,
    AnnouncementComponent]
})
export class GlobalComponentModule { }
