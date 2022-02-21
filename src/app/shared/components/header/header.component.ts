import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  //user: any;
  isLogged: boolean = false
  ruta!: string;
  public user!: User | null;

  constructor(public dataService: DataService, private router: Router, public auth: AuthService) {
    console.log(auth.getCurrentUser());
    
  }

  async ngOnInit() {}

  goBack(){    
    this.router.navigate(['home']);
  }

  goLogin(){    
    this.router.navigate(['/']);
  }

  goRegister(){    
    this.router.navigate(['/register']);
  }

  goToProfile(){    
    this.router.navigate(['/profile']);
  }

  logout(){
    this.auth.logout()
    .then(() => this.router.navigate(['/']))
    .catch((e) => console.log(e.message));
  }
}
