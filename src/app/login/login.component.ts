import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.registerForm();
    this.loginForm();

    document.getElementById('signUp')!.addEventListener('click', () => {
      document.getElementById('container')!.classList.add("right-panel-active");
    });

    document.getElementById('signIn')!.addEventListener('click', () => {
      document.getElementById('container')!.classList.remove("right-panel-active");
    });
  }

  loginForm() {
    this.formLogin = this.fb.group({
      email: 'adm@gmail.com',
      password: '123',
    })
  }

  registerForm() {
    this.formRegister = this.fb.group({
      name: '',
      email: '',
      password: '',
    })
  }

  login() {
    this.loginService.login(this.formLogin.value).subscribe((res: any) => {
      console.log("res: ", res);

    }, err => {
      console.log("erro: ", err);

    })

  }

  register() {
    this.loginService.register(this.formRegister.value);
  }

}
