import { LoginService } from './service/login.service';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio-TradMap';
  links = [
    { path: 'lista', label: 'Lista', isActive: true },
    { path: 'favoritos', label: 'Favoritos', isActive: true }]
  activeLink = this.links[0]
  background: ThemePalette = undefined;

  isAuth: boolean = false

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.showToolbar.subscribe(
      show => this.isAuth = show
    )

    console.log(this.isAuth);

  }
}
