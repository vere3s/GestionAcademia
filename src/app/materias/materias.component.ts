import { Component, OnInit, inject } from '@angular/core';
import { MateriasService } from '../services/materias.service';
import { CommonModule } from '@angular/common';
import { Materia } from '../interfaces/materia.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent implements OnInit {
  // Haciendo inyeccion de dependencia
  private readonly materiasService = inject(MateriasService);
  private readonly router = inject(Router);

  lstMaterias: Materia[];
  
  constructor(){
    this.lstMaterias = [];
  }

  ngOnInit(): void {
    this.getAllMaterias();
    }

  getAllMaterias(){
    this.materiasService.obtenerMaterias().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstMaterias = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }
  navigateToForm(){
    this.router.navigate(['/agregarMateria']);
    }
// Eliminar una materia
deleteMateria(event: any){
  Swal.fire({
    title: "¿Quiere eliminar este registro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true
}).then((result) => {
  if (result.isConfirmed){
    this.materiasService.eliminarMateria(event.target.value).subscribe(
{
// En caso exitoso
  next: (temp) => {
    Swal.fire("Eliminado","Registro eliminado con exito","success");
      this.getAllMaterias();
     },
    // En caso erroneo
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar',
        text: parsearErroresAPI(err).toString()
       });
      }
    });
   }
  });
 }
 updateMateria(valor: number){
  // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if(valor){
    // Como puede notar, ahora se anexa un valor a la redireccion.
      this.router.navigate(['/agregarMateria', valor]);
    }
  } 
}
