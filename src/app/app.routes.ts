import { Routes } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { GruposComponent } from './grupos/grupos.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AgregarCarreraComponent } from './carreras/agregar-carrera/agregar-carrera.component';
import { AgregarEstudianteComponent } from './estudiantes/agregar-estudiante/agregar-estudiante.component';
import { AgregarGrupoComponent } from './grupos/agregar-grupo/agregar-grupo.component';
import { AgregarMateriaComponent } from './materias/agregar-materia/agregar-materia.component';
import { AgregarProfesorComponent } from './profesores/agregar-profesor/agregar-profesor.component';

export const routes: Routes = [
    {path: 'Carrera', component: CarrerasComponent, pathMatch: 'full'}, // Ruta por defecto
    { path:'agregarCarrera', component: AgregarCarreraComponent},
    { path:'agregarCarrera/:idCarrera', component:
    AgregarCarreraComponent},

    {path: '', component: EstudiantesComponent, pathMatch: 'full'}, // Ruta por defecto
    { path:'agregarEstudiante', component: AgregarEstudianteComponent},
    { path:'agregarEstudiante/:idEstudiante', component:
    AgregarEstudianteComponent},

    {path: 'Grupo', component: GruposComponent, pathMatch: 'full'}, // Ruta por defecto
    { path:'agregarGrupo', component: AgregarGrupoComponent},
    { path:'agregarGrupo/:idGrupo', component:
    AgregarGrupoComponent},

    {path: 'Materia', component: MateriasComponent, pathMatch: 'full'}, // Ruta por defecto
    { path:'agregarMateria', component: AgregarMateriaComponent},
    { path:'agregarMateria/:idMateria', component:
    AgregarMateriaComponent},

    {path: 'Profesor', component: ProfesoresComponent, pathMatch: 'full'}, // Ruta por defecto
    { path:'agregarProfesor', component: AgregarProfesorComponent},
    { path:'agregarProfesor/:idProfesor', component:
    AgregarProfesorComponent},

    //{path: '**', redirectTo: '', pathMatch: 'full'}, // Rutas no existentes

];
