import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/shared/models/Persona';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: Persona[] = [];
  filteredOptions!: Observable<Persona[]>;

  invitados!: Persona[];
  invitadosFake!: Persona[];
  navExtras: NavigationExtras = {
    state: {
      persona: null
    }
  }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  columns = [
    {
      columnDef: 'parentesco',
      header: 'Parentesco',
      cell: (element: Persona) => `${element.parentesco}`
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: Persona) => `${element.nombre} ${element.apellidos}`
    },
    {
      columnDef: 'invitado',
      header: 'Invitado',
      cell: (element: Persona) => element.invitado == true ? `SI` : ""
    },
    {
      columnDef: 'confirmado',
      header: 'Confirmado',
      cell: (element: Persona) => element.confirmado  == true ? `SI` : ""
    }
  ];
  displayedColumns: any

  constructor(private dataService: DataService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.getInvitados();
  }

  async getInvitados(){
    await this.dataService.invitados.subscribe((invitados: Persona[]) => {
      this.invitados = invitados;
      this.options = invitados
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.fillTable(invitados);
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

  fillTable(ELEMENT_DATA: Persona[]){
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  private _filter(value: string): Persona[] {
    const filterValue = value.toLowerCase();   
    return this.invitados.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  filterInvitados(e: any){
    console.log(e);
    this.invitados = this.invitados.filter(x => x.id === e);
  }
}
