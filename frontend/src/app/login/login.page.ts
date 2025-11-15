import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

type Mode = 'login' | 'register';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  // pestaña actual: login o registro
  mode: Mode = 'login';

  // Datos del formulario de login
  loginData = {
    email: '',
    password: '',
  };

  // Datos del formulario de registro
  registerData = {
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  };

  // Mensaje de error que se muestra en la página
  errorMsg = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  setMode(mode: Mode) {
    this.mode = mode;
    this.errorMsg = '';
  }

  // ---------- LOGIN ----------
  onLogin() {
    this.errorMsg = '';
    this.loading = true;

    this.auth.login(this.loginData.email, this.loginData.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Error al iniciar sesión';
      },
    });
  }

  // ---------- REGISTRO ----------
  onRegister() {
    this.errorMsg = '';

    if (!this.registerData.nombre || !this.registerData.email || !this.registerData.password) {
      this.errorMsg = 'Rellena nombre, email y contraseña';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;

    // OJO: aquí va la llamada con parámetros sueltos
    this.auth
      .register(
        this.registerData.nombre,
        this.registerData.email,
        this.registerData.password,
        this.registerData.telefono || ''
      )
      .subscribe({
        next: () => {
          this.loading = false;
          // Tras registrar, volvemos a la pestaña login
          this.mode = 'login';
          this.loginData.email = this.registerData.email;
          this.loginData.password = '';

          // Limpio contraseñas del registro
          this.registerData.password = '';
          this.registerData.confirmPassword = '';
          this.errorMsg = 'Usuario registrado. Ahora puedes iniciar sesión.';
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = err?.error?.message || 'Error al registrar usuario';
        },
      });
  }
}

