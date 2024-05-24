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
}
