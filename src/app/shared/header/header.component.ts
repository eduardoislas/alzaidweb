import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel, User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String = '';
  User: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService, private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    
  }

  
  salir(){
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

}
