import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerMaterias() {
    return this.http.get<Materia[]>(endpoints.obtenerMaterias);
  }
      // Obtener Materia por ID
      obtenerMateriaPorID(idMateria: number){
        return this.http.get<Materia>(endpoints.obtenerMateriaPorID.replace(':idMateria', idMateria.toString()));
      }
      // Insertar Materia
      agregarMateria(materia: Materia){
      // Se arma el objeto a enviar
      let body = {
          "nombreMateria": materia.nombreMateria
      }
        return this.http.post<any>(endpoints.agregarMateria,body);
      }
      // Eliminar un Materia
      eliminarMateria(idMateria: number){
        return this.http.delete<any>(endpoints.eliminarMateria.replace(':idMateria',idMateria.toString()));
      }
      // Actualizar Materia
    actualizarMateria(idMateria: number, materia: Materia){
      // Se arma el objeto a enviar
      let body = {
        "nombreMateria": materia.nombreMateria
      }
        return this.http.put<number>(endpoints.actualizarMateria.replace(':idMateria',idMateria.toString()), body);
        }
}
