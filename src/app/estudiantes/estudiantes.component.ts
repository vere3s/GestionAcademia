import { Component, inject } from '@angular/core';
import { EstudiantesService } from '../services/estudiantes.service';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../interfaces/estudiante.interface';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {
  
  // Haciendo inyeccion de dependencia
  private readonly estudiantesService = inject(EstudiantesService);
  public lstEstudiantes: Estudiante[];
  
  constructor(){
    this.lstEstudiantes = [];
    this.getAllStudents();
  }

  getAllStudents(){
  this.estudiantesService.obtenerEstudiantes().subscribe({
    // Se evalua que la respuesta del endpoint sea exitosa
    next: (temp) => {
      // Se asigna la lista al arreglo anteriormente descrito
      this.lstEstudiantes = temp;
    },
    // En caso de error
    error: (err) => {
      console.log("No se pudo obtener informacion");
     }
   })
  }
}
