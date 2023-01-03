import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './global-component/setting/setting.component';
import { HelpComponent } from './global-component/help/help.component';
import { CommonComponent } from './common-component/common-component.component';

const routes: Routes = [
  { path: "setting", component: SettingComponent },
  { path: "help", component: HelpComponent },
  { path: "", component: CommonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
