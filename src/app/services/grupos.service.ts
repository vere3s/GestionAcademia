import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Grupo } from '../interfaces/grupo.interface';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private readonly http = inject(HttpClient);

  constructor() { }

  obtenerGrupos() {
    return this.http.get<Grupo[]>(endpoints.obtenerGrupos);
  }
  // Obtener Grupo por ID
  obtenerGrupoPorID(idGrupo: number){
    return this.http.get<Grupo>(endpoints.obtenerGrupoPorID.replace(':idGrupo', idGrupo.toString()));
  }
  // Insertar Grupo
  agregarGrupo(grupo: Grupo){
  // Se arma el objeto a enviar
  let body = {
      "idCarrera": grupo.idCarrera,
      "idMateria": grupo.idMateria,
      "idProfesor": grupo.idProfesor,
      "ciclo": grupo.ciclo,
      "anio": grupo.anio
  }
    return this.http.post<any>(endpoints.agregarGrupo,body);
  }
  // Eliminar un Grupo
  eliminarGrupo(idGrupo: number){
    return this.http.delete<any>(endpoints.eliminarGrupo.replace(':idGrupo',idGrupo.toString()));
  }
  // Actualizar Grupo
actualizarGrupo(idGrupo: number, grupo: Grupo){
  // Se arma el objeto a enviar
  let body = {
    "idCarrera": grupo.idCarrera,
    "idMateria": grupo.idMateria,
    "idProfesor": grupo.idProfesor,
    "ciclo": grupo.ciclo,
    "anio": grupo.anio
  }
    return this.http.put<number>(endpoints.actualizarGrupo.replace(':idGrupo',idGrupo.toString()), body);
    }
}
