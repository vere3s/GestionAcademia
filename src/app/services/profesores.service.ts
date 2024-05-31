import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Profesor } from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerProfesores() {
    return this.http.get<Profesor[]>(endpoints.obtenerProfesores);
  }
      // Obtener Profesor por ID
      obtenerProfesorPorID(idProfesor: number){
        return this.http.get<Profesor>(endpoints.obtenerProfesorPorID.replace(':idProfesor', idProfesor.toString()));
      }
      // Insertar Profesor
      agregarProfesor(profesor: Profesor){
      // Se arma el objeto a enviar
      let body = {
          "nombresProfesor": profesor.nombresProfesor,
          "apellidosProfesor": profesor.apellidosProfesor,
          "email": profesor.email
      }
        return this.http.post<any>(endpoints.agregarProfesor,body);
      }
      // Eliminar un Profesor
      eliminarProfesor(idProfesor: number){
        return this.http.delete<any>(endpoints.eliminarProfesor.replace(':idProfesor',idProfesor.toString()));
      }
      // Actualizar Profesor
    actualizarProfesor(idProfesor: number, profesor: Profesor){
      // Se arma el objeto a enviar
      let body = {
          "nombresProfesor": profesor.nombresProfesor,
          "apellidosProfesor": profesor.apellidosProfesor,
          "email": profesor.email
      }
        return this.http.put<number>(endpoints.actualizarProfesor.replace(':idProfesor',idProfesor.toString()), body);
        }
}
