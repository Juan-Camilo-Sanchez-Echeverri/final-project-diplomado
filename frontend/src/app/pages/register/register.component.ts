import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUser } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const newUser: RegisterUser = this.registerForm.value;

    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.authService.login(response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error.message || 'Error al registrar el usuario';
        alert(this.errorMessage);
      },
    });
  }
}
