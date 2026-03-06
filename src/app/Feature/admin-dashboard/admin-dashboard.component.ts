import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeComponent = 'dashboard';
  isSidebarExtended = false;
  isMobileSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarExtended = !this.isSidebarExtended;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  navigate(route: string) {
    this.activeComponent = route;
  }
}
