import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
    private readonly http = inject(HttpClient);
    constructor() { }
    obtenerEstudiantes() {
      return this.http.get<Estudiante[]>(endpoints.obtenerEstudiantes);
    }
}
