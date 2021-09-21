import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onClickRegister = () => {
    if (!this.username || !this.password) {
      alert('Enter username & password to register');
      return;
    }
    this.authService.register(this.username, this.password).subscribe((res) => {
      res.status()
    });
  };
}
