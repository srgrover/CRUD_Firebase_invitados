import { Grupo } from './../../shared/models/Grupo';
import { DialogViewInviteListComponent } from './../../shared/components/dialog-view-invite-list/dialog-view-invite-list.component';
import { SexoEnum } from './../../shared/Enum/SexoEnum';
import { QueryEnum } from '../../shared/Enum/QueryEnum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from './../../shared/services/data.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/shared/models/Persona';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
//Administración -------------------
  public debug: boolean = false;
//----------------------------------

  public queryList = QueryEnum;

  isLoading = false;

  public tabList = ["Todos", "Hombres", "Mujeres", "Invitados", "Confirmados", "Rechazados"];

  myControl = new FormControl();

  @ViewChild('formSearch')
  menuElement!: MatFormField;

  @ViewChild('formSearchContainer')
  formSearchContainer!: ElementRef;

  elementPosition: any;
  sticky: boolean = false;
  isSearching: boolean = false;

  options: Persona[] = [];
  filteredOptions!: Observable<Persona[]>;

  invitados!: Persona[];
  invitadosFilter: Persona[] = [];
  grupos: any;
  gruposRechazados: Grupo[] = [];
  numInvitados: number = 0;

  // Personas hombres en lista
  invitadosHombre!: Persona[];
  invitadosHombreAdulto!: Persona[];
  invitadosHombreJoven!: Persona[];
  invitadosHombreInfante!: Persona[];

  // Personas mujeres en lista
  invitadosMujer!: Persona[];
  invitadosMujerInfante!: Persona[];
  invitadosMujerJoven!: Persona[];
  invitadosMujerAdulto!: Persona[];

  // Count personas rechazados no incluidos
  invitadosHombreInfanteCount!: number;
  invitadosHombreJovenCount!: number;
  invitadosHombreAdultoCount!: number;
  invitadosMujerInfanteCount!: number;
  invitadosMujerJovenCount!: number;
  invitadosMujerAdultoCount!: number;

  // Personas con modificadores de estado
  invitadosEnviado!: Persona[];
  invitadosConfirmado!: Persona[];
  invitadosRechazado!: Persona[];

  invitadosListTabs:any = []
  gruposCount: number = 0;
  sinGrupoCount: number = 0;

  navExtras: NavigationExtras = {
    state: {
      persona: null
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    //if(this.debug) console.log("windowScroll", windowScroll)
    this.sticky = windowScroll >= this.elementPosition + 120;
  }

  constructor(private dataService: DataService, private router: Router, private auth: AuthService, public dialog: MatDialog,) {}

  ngAfterViewInit(){
    this.elementPosition = this.formSearchContainer.nativeElement.offsetTop;
    //if(this.debug) console.log("offsetTop", this.formSearchContainer.nativeElement.offsetTop)
  }

  async ngOnInit(): Promise<void> {
    await this.getInvitados();
    await this.dataService.getGruposCount().subscribe( (count: number) => this.gruposCount = count-1);
  }

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  getInvitados(){
    this.isLoading = true;
    this.dataService.invitados.subscribe((invitados: Persona[]) => {
      this.invitados    = invitados;
      this.numInvitados = invitados.length;

      //Hombres
      this.invitadosHombre = invitados.filter(x => x.sexo == "Hombre");
      this.invitadosHombreAdulto  = this.invitadosHombre.filter(x => x.clasificacion == "Adulto");
      this.invitadosHombreJoven   = this.invitadosHombre.filter(x => x.clasificacion == "Joven");
      this.invitadosHombreInfante = this.invitadosHombre.filter(x => x.clasificacion == "Niño");

      this.invitadosHombreAdultoCount = this.invitadosHombreAdulto.length - this.invitadosHombreAdulto.filter(x => x.rechazado == true).length;
      this.invitadosHombreJovenCount = this.invitadosHombreJoven.length - this.invitadosHombreJoven.filter(x => x.rechazado == true).length;
      this.invitadosHombreInfanteCount = this.invitadosHombreInfante.length - this.invitadosHombreInfante.filter(x => x.rechazado == true).length;

      //Mujeres
      this.invitadosMujer = invitados.filter(x => x.sexo == "Mujer");
      this.invitadosMujerAdulto  = this.invitadosMujer.filter(x => x.clasificacion == "Adulto");
      this.invitadosMujerJoven   = this.invitadosMujer.filter(x => x.clasificacion == "Joven");
      this.invitadosMujerInfante = this.invitadosMujer.filter(x => x.clasificacion == "Niño");

      //Debug
      if(this.debug){ // Recuento hombres
        console.log("🚀 Hombres 🚀")
        console.log("Adultos", this.invitadosHombreAdulto)
        console.log("Jóvenes", this.invitadosHombreJoven)
        console.log("Niños", this.invitadosHombreInfante)
      }

      if(this.debug){ //Recuento mujeres
        console.log("🚀 Mujeres 🚀")
        console.log("Adultas", this.invitadosMujerAdulto)
        console.log("Jóvenes", this.invitadosMujerJoven)
        console.log("Niñas", this.invitadosMujerInfante)
      }

      //Generales
      this.invitadosEnviado    = invitados.filter(x => x.invitado == true);
      this.invitadosConfirmado = invitados.filter(x => x.confirmado == true);
      this.invitadosRechazado  = invitados.filter(x => x.rechazado == true);

      this.sinGrupoCount = invitados.filter(x => x.grupo === "hUNpRRMnt5nL3kuz0yiK" && x.rechazado === false).length;
      
      if(this.debug) console.log("SIN GRUPO", invitados.filter(x => x.grupo === "hUNpRRMnt5nL3kuz0yiK"));
      if(this.debug) console.log("COUNT SIN GRUPO", this.sinGrupoCount);

      
      this.dataService.grupos.pipe(take(1)).subscribe((gr: Grupo[]) => {
        this.gruposRechazados = gr.filter((x) => x.rechazado);
      })

      this.invitadosListTabs = [this.invitados, this.invitadosHombre, this.invitadosMujer, this.invitadosEnviado, this.invitadosConfirmado, this.invitadosRechazado];

      this.options = invitados;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.isLoading = false;
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
    const filterValue = value?.toLowerCase();   
    return this.invitados.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.apellidos?.toLowerCase().includes(filterValue));
  }

  filterInvitados(e: any){
    this.isSearching = true;
    this.invitadosFilter = this.invitados.filter(x => x.id === e);
  }

  loadInvitados(e: any){
    var query: string | undefined = undefined;
    var value: any;

    if(e.tab.textLabel == SexoEnum.hombre + "s" || e.tab.textLabel == SexoEnum.mujer + "es"){
      query = QueryEnum.sexo;
      value = e.tab.textLabel
    } 
    else if(e.tab.textLabel != 'Todos'){
      query = e.tab.textLabel.toLowerCase();
      value = true;
    }
    
    this.dataService.getInvitados();
    this.getInvitados();
  }

  clearSearch(){
    this.isSearching = false;
    this.invitadosFilter = [];
    this.myControl.reset();
  }

  goToListInviteClasification(list: Persona[], title: string){
    const dialogRefDelete = this.dialog.open(DialogViewInviteListComponent, {
      width: '400px',
      height: '71.5vh',
      maxHeight: '71.5vh',
      minHeight: '60.5vh',
      data: {
        title: title,
        subtitle: 'Selecciona uno para editarlo',
        list: list,
      },
    });

    dialogRefDelete.afterClosed().subscribe(async (persona) => {
      if (persona) {
        this.goToEdit(persona);
      }
    });
  }
}