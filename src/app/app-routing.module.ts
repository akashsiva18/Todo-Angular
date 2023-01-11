import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './settings/setting.component';
import { HelpComponent } from './global-component/help/help.component';
import { AnnouncementComponent } from './global-component/announcement/announcement.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './global-component/page-not-found/page-not-found.component';
import { TaskMainComponent } from './task-components/task-component.component';

const routes: Routes = [
  { path: "setting", component: SettingComponent },
  { path: "help", component: HelpComponent },
  { path: "whats-new", component: AnnouncementComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", component: TaskMainComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
