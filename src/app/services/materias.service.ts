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
}
