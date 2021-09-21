import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onClickLogin = () => {
    if (!this.username || !this.password) {
      alert('Enter credentials to login');
      return;
    }
    this.authService
      .login(this.username, this.password)
      .subscribe((response) => {
        localStorage.setItem('user-id', response);
        this.router.navigate(['/home']);
      });
  };
}
