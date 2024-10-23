import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
