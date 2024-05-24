import { Component, inject } from '@angular/core';
import { GruposService } from '../services/grupos.service';
import { CommonModule } from '@angular/common';
import { Grupo } from '../interfaces/grupo.interface';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss'
})
export class GruposComponent {
  // Haciendo inyeccion de dependencia
  private readonly gruposService = inject(GruposService);
  public lstGrupos: Grupo[];

  constructor(){
    this.lstGrupos = [];
    this.getAllGroups();
  }

  getAllGroups(){
  this.gruposService.obtenerGrupos().subscribe({
    // Se evalua que la respuesta del endpoint sea exitosa
    next: (temp) => {
      // Se asigna la lista al arreglo anteriormente descrito
      this.lstGrupos = temp;
    },
    // En caso de error
    error: (err) => {
      console.log("No se pudo obtener informacion");
    }
  })
  }
}
