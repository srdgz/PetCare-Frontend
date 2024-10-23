import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <li>
      <a
        [routerLink]="link"
        class="block px-4 py-2 text-white font-semibold hover:text-primary dark:text-dark-text dark:hover:text-dark-primary"
        (click)="handleClick()"
      >
        <fa-icon [icon]="icon"></fa-icon>
        <span class="ms-3">{{ label }}</span>
      </a>
    </li>
  `,
})
export class MenuItemsComponent {
  @Input() link: string = '';
  @Input() icon: any;
  @Input() label: string = '';
  @Input() closeDropdown?: () => void;

  handleClick() {
    if (this.closeDropdown) {
      this.closeDropdown();
    }
  }
}
