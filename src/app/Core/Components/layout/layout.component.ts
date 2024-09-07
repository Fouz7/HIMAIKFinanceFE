import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarExtended = false;
  activeComponent = 'dashboard';
  menuItems = [
    { title: 'Dashboard', icon: 'pi pi-table' },
    { title: 'Income', icon: 'pi pi-money-bill' },
    { title: 'Transaction', icon: 'pi pi-wallet' }
  ];

  toggleSidebar() {
    this.isSidebarExtended = !this.isSidebarExtended;
  }

  navigate(route: string) {
    this.activeComponent = route;
  }
}
