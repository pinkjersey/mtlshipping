import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {Credentials} from './credentials';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;

  constructor(private router: Router,
              private loginService: LoginService ) { }

  ngOnInit() {
  }

  login(): void {
    console.log(`updating item ${this.email} ${this.pass}`);
    const cred = new Credentials();
    cred.email = this.email;
    cred.pass = this.pass;
    this.loginService.login(cred)
      .subscribe(retItem => {
        console.log(`login complete ${retItem.fullName}`);
        this.router.navigate(['/dashboard'])
      })
  }
}
