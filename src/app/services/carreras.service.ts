import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Carrera } from '../interfaces/carrera.interface';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerCarreras() {
    return this.http.get<Carrera[]>(endpoints.obtenerCarreras);
  }
    // Obtener Carrera por ID
    obtenerCarreraPorID(idCarrera: number){
      return this.http.get<Carrera>(endpoints.obtenerCarreraPorID.replace(':idCarrera', idCarrera.toString()));
    }
    // Insertar Carrera
    agregarCarrera(carrera: Carrera){
    // Se arma el objeto a enviar
    let body = {
        "codigoCarrera": carrera.codigoCarrera,
        "nombreCarrera": carrera.nombreCarrera
    }
      return this.http.post<any>(endpoints.agregarCarrera,body);
    }
    // Eliminar un Carrera
    eliminarCarrera(idCarrera: number){
      return this.http.delete<any>(endpoints.eliminarCarrera.replace(':idCarrera',idCarrera.toString()));
    }
    // Actualizar Carrera
  actualizarCarrera(idCarrera: number, carrera: Carrera){
    // Se arma el objeto a enviar
    let body = {
      "codigoCarrera": carrera.codigoCarrera,
      "nombreCarrera": carrera.nombreCarrera
    }
      return this.http.put<number>(endpoints.actualizarCarrera.replace(':idCarrera',idCarrera.toString()), body);
      }
}
