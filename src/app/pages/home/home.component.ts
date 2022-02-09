import { DataService } from './../../shared/services/data.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/shared/models/Persona';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Grupos } from 'src/assets/grupos';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();

  @ViewChild('formSearch')
  menuElement!: MatFormField;

  @ViewChild('formSearchContainer')
  formSearchContainer!: ElementRef;

  elementPosition: any;
  sticky: boolean = false;

  options: Persona[] = [];
  filteredOptions!: Observable<Persona[]>;

  invitados!: Persona[];
  grupos: any;
  numInvitados: number = 0;
  numInvitadosHombre: number = 0;
  numInvitadosMujer: number = 0;
  numInvitadosEnviado: number = 0;
  numInvitadosConfirmado: number = 0;
  numInvitacionesRechazadas: number = 0;
  navExtras: NavigationExtras = {
    state: {
      persona: null
    }
  }
  

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    console.log("🚀 ~ file: home.component.ts ~ line 46 ~ HomeComponent ~ handleScroll ~ windowScroll", windowScroll)
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  constructor(private dataService: DataService, private router: Router) {
    this.grupos = Grupos;
  }

  ngAfterViewInit(){
    this.elementPosition = this.formSearchContainer.nativeElement.offsetTop;
    console.log("🚀 ~ file: home.component.ts ~ line 60 ~ HomeComponent ~ ngAfterViewInit ~ this.menuElement.underlineRef.nativeElement.offsetTop", this.formSearchContainer)
  }

  async ngOnInit(): Promise<void> {
    await this.getInvitados();
  }

  async getInvitados(){
    await this.dataService.invitados.subscribe((invitados: Persona[]) => {
      this.invitados = invitados;
      this.numInvitados = invitados.length;
      this.numInvitadosHombre = invitados.filter(x => x.sexo == "Hombre").length;
      this.numInvitadosMujer = invitados.filter(x => x.sexo == "Mujer").length;
      this.numInvitadosEnviado = invitados.filter(x => x.invitado == true).length;
      this.numInvitadosConfirmado = invitados.filter(x => x.confirmado == true).length;
      this.numInvitacionesRechazadas = invitados.filter(x => x.rechazado == true).length;

      this.options = invitados
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  goToNew(){
    this.router.navigate(['new']);
  }

  goToEdit(persona: Persona){
    if(this.navExtras.state) this.navExtras.state = persona;
    this.router.navigate(['edit'], this.navExtras);
  }

  onDelete(id: string){
    this.dataService.deleteInvitado(id)
  }

  private _filter(value: string): Persona[] {
    const filterValue = value.toLowerCase();   
    return this.invitados.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.apellidos?.toLowerCase().includes(filterValue));
  }

  filterInvitados(e: any){
    this.invitados = this.invitados.filter(x => x.id === e);
  }
}
