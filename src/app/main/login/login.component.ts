import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  user: string = '';
  password: string = '';

  constructor(private loginService: ServicesService, private router: Router) {}

  login(user: string, password: string) {
    console.log("Datos recogidos del formulario:", user, password);

    this.loginService.login(user, password).subscribe(
      response => {
        console.log("Respuesta del backend:", response);
        this.router.navigate(['/main/index']);
        // aquí puedes guardar el token o redirigir
      },
      error => {
        console.error("Error en login:", error);
      }
    );
  }
}
