import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  formData = {
    newPassword: '',
    confirmPassword: '',
  };
  avatarUrl: string | ArrayBuffer | null = null;
  username: string = '';
  email: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = this.userService.getUserId();
    if (userId !== null) {
      this.userService.getUserProfile(userId).subscribe({
        next: (user: User) => {
          this.username = user.username;
          this.email = user.email;
          this.avatarUrl = user.avatar || null;
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        },
      });
    } else {
      console.error('User ID not found');
    }
  }

  handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    if (this.formData.newPassword !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const updatedData: any = {};

    if (this.avatarUrl) {
      updatedData.avatar = this.avatarUrl;
    }

    if (this.formData.newPassword) {
      updatedData.password = this.formData.newPassword;
    }

    this.userService.updateUserProfile(updatedData).subscribe({
      next: (response) => {
        alert('Perfil actualizado con éxito');
        if (this.avatarUrl) {
          this.avatarUrl = updatedData.avatar;
        }
      },
      error: (error) => {
        alert('Error al actualizar el perfil');
        console.error('Error al actualizar el perfil:', error);
      },
    });
  }
}
