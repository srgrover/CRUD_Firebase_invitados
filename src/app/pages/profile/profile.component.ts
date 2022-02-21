import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser!: User | null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currentUser = this.auth.getCurrentUser();
  }
}
