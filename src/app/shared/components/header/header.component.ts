import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ruta!: string;
  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getRuta(); 
    }, 500);
  }

  goBack(){    
    this.router.navigate(['home']);
  }

  getRuta(){
    //console.log("fffffffffffffffffffffff");
    
    this.dataService.getRuta().subscribe((ruta: string) => {
      console.log("🚀 ~ file: header.component.ts ~ line 29 ~ HeaderComponent ~ this.dataService.getRuta ~ ruta", ruta)
      this.ruta = ruta;
      console.log("🚀 ~ file: header.component.ts ~ line 30 ~ HeaderComponent ~ this.dataService.getRuta ~ ruta", ruta)
      console.log("🚀 ~ file: header.component.ts ~ line 30 ~ HeaderComponent ~ this.dataService.getRuta ~ this.ruta", this.ruta)
    })
  }
}
