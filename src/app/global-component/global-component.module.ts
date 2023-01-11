import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HelpComponent } from './help/help.component';
import { AppRoutingModule } from '../app-routing.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { SettingsModule } from '../settings/settings.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    HelpComponent,
    AnnouncementComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SettingsModule,
    ProfileModule,
    FormsModule
  ],
  exports: [
    NavBarComponent,
    SearchBarComponent,
    HelpComponent,
    AnnouncementComponent]
})
export class GlobalComponentModule { }
