import { Component, inject } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { CommonModule } from '@angular/common';
import { Carrera } from '../interfaces/carrera.interface';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.scss'
})
export class CarrerasComponent {
  // Haciendo inyeccion de dependencia
  private readonly carrerasService = inject(CarrerasService);
  public lstCarreras: Carrera[];

  constructor(){
    this.lstCarreras = [];
    this.getAllCourses();
  }

  getAllCourses(){
  this.carrerasService.obtenerCarreras().subscribe({
    // Se evalua que la respuesta del endpoint sea exitosa
    next: (temp) => {
      // Se asigna la lista al arreglo anteriormente descrito
      this.lstCarreras = temp;
    },
    // En caso de error
    error: (err) => {
      console.log("No se pudo obtener informacion");
    }
  })
  }
}
