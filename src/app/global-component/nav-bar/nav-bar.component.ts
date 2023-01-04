import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public settingRouting = '/setting';

  changeRouterLink() {
    if(this.settingRouting == '/setting') {
      this.settingRouting = '';
    } else {
      this.settingRouting = '/setting';
    }
  }
}
