import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  login() {

  }

}