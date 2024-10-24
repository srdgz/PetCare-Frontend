import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    ThemeToggleComponent,
    MenuItemsComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false;
  isDropdownOpen = false;
  isLargeScreen = false;

  navItems = [
    { link: '/dashboard/home', icon: ['fas', 'home'], label: 'Inicio' },
    { link: '/dashboard/pets', icon: ['fas', 'paw'], label: 'Mis mascotas' },
    { link: '/dashboard/news', icon: ['fas', 'newspaper'], label: 'Noticias' },
    {
      link: '/dashboard/user-profile',
      icon: ['fas', 'gear'],
      label: 'Configuración',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 1024;
    if (this.isLargeScreen) {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  logoutAndCloseDropdown() {
    this.logout();
    this.closeDropdown();
  }
}
