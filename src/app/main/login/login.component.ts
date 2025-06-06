import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  user!: string;
  password!: string;

  constructor(private loginService: ServicesService) { }

  login(user: string, password: string) {
    this.loginService.login(user, password).subscribe(
      () => console.log("Lo has loggeado")
    );
  }
}
