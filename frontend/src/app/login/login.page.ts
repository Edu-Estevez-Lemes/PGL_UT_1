import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PhotoService } from '../photo.service';

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

  // Imagen para el registro
  registerImagenBlob: Blob | null = null;
  registerImagenPreview: string | null = null;

  // Mensaje de error que se muestra en la página
  errorMsg = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private photo: PhotoService
  ) {}


  // ---------- LOGIN ----------
  onLogin() {
    this.errorMsg = '';
    this.loading = true;

    this.auth.login(this.loginData.email, this.loginData.password).subscribe({
      next: () => {
        this.loading = false;
        // Si login OK, vamos a /home
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Error al iniciar sesión';
      },
    });
  }

  // ---------- FOTO PARA REGISTRO ----------
  async onRegisterTakePhoto() {
    try {
      this.registerImagenBlob = await this.photo.takePhoto();
      this.registerImagenPreview = URL.createObjectURL(
        this.registerImagenBlob
      );
    } catch (e) {
      console.error('Error al sacar foto', e);
    }
  }

  async onRegisterPickImage() {
    try {
      this.registerImagenBlob = await this.photo.pickImage();
      this.registerImagenPreview = URL.createObjectURL(
        this.registerImagenBlob
      );
    } catch (e) {
      console.error('Error al elegir imagen', e);
    }
  }

  // ---------- REGISTRO ----------
  onRegister() {
    this.errorMsg = '';

    if (
      !this.registerData.nombre ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.errorMsg = 'Rellena nombre, email y contraseña';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;

    this.auth
      .register({
        nombre: this.registerData.nombre,
        email: this.registerData.email,
        telefono: this.registerData.telefono,
        password: this.registerData.password,
        imagen: this.registerImagenBlob ?? undefined,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          // Tras registrar, volvemos a la pestaña login
          this.mode = 'login';
          this.loginData.email = this.registerData.email;
          this.loginData.password = '';

          // Limpio contraseñas e imagen del registro
          this.registerData.password = '';
          this.registerData.confirmPassword = '';
          this.registerImagenBlob = null;
          this.registerImagenPreview = null;

          this.errorMsg = 'Usuario registrado. Ahora puedes iniciar sesión.';
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg =
            err?.error?.message || 'Error al registrar usuario';
        },
      });
  }
}
