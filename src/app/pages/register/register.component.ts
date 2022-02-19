import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/shared/models/LoginData';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required])
  });

  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  register(data: LoginData) {
    this.authService
      .register(data)
      .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }
}
