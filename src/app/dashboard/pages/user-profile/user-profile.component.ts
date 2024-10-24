import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  avatarUrl: string | ArrayBuffer | null = null;
  username: string = '';
  email: string = '';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm() {
    this.profileForm = this.fb.group(
      {
        newPassword: ['', [Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (newPassword !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }

    return null;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
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
    if (this.profileForm.invalid) {
      alert('Por favor, corrija los errores en el formulario');
      return;
    }

    const updatedData: any = {};

    if (this.avatarUrl) {
      updatedData.avatar = this.avatarUrl;
    }

    if (this.profileForm.get('newPassword')?.value) {
      updatedData.password = this.profileForm.get('newPassword')?.value;
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
