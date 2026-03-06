import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  @Input() sidebarOpen = false;
  @Input() mobileSidebarOpen = false;

  @Output() navigateEvent = new EventEmitter<string>();
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() closeMobileEvent = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleEvent.emit(this.sidebarOpen);
  }

  navigate(route: string) {
    this.navigateEvent.emit(route);
    this.closeMobileEvent.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
