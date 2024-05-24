import { environment } from "../../environments/environment.development";

export const endpoints = {
    agregarCarrera: environment.serverUrl.concat("api/carreras/agregarCarrera"),
    actualizarCarrera: environment.serverUrl.concat("api/carreras/actualizarCarrera/:idCarrera"),
    eliminarCarrera: environment.serverUrl.concat("api/carreras/eliminarCarrera/:idCarrera"),
    obtenerCarreraPorID: environment.serverUrl.concat("api/carreras/obtenerCarreraPorID/:idCarrera"),
    obtenerCarreras: environment.serverUrl.concat("api/carreras/obtenerCarreras"),

    agregarEstudiante: environment.serverUrl.concat("api/estudiantes/agregarEstudiante"),
    actualizarEstudiante: environment.serverUrl.concat("api/estudiantes/actualizarEstudiante/:idEstudiante"),
    eliminarEstudiante: environment.serverUrl.concat("api/estudiantes/eliminarEstudiante/:idEstudiante"),
    obtenerEstudiantePorID: environment.serverUrl.concat("api/estudiantes/obtenerEstudiantePorID/:idEstudiante"),
    obtenerEstudiantes: environment.serverUrl.concat("api/estudiantes/obtenerEstudiantes"),

    agregarGrupo: environment.serverUrl.concat("api/grupos/agregarGrupo"),
    actualizarGrupo: environment.serverUrl.concat("api/grupos/actualizarGrupo/:idGrupo"),
    eliminarGrupo: environment.serverUrl.concat("api/grupos/eliminarGrupo/:idGrupo"),
    obtenerGrupoPorID: environment.serverUrl.concat("api/grupos/obtenerGrupoPorID/:idGrupo"),
    obtenerGrupos: environment.serverUrl.concat("api/grupos/obtenerGrupos"),

    agregarMateria: environment.serverUrl.concat("api/materias/agregarMateria"),
    actualizarMateria: environment.serverUrl.concat("api/materias/actualizarMateria/:idMateria"),
    eliminarMateria: environment.serverUrl.concat("api/materias/eliminarMateria/:idMateria"),
    obtenerMateriaPorID: environment.serverUrl.concat("api/materias/obtenerMateriaPorID/:idMateria"),
    obtenerMaterias: environment.serverUrl.concat("api/materias/obtenerMaterias"),

    agregarProfesor: environment.serverUrl.concat("api/profesores/agregarProfesor"),
    actualizarProfesor: environment.serverUrl.concat("api/profesores/actualizarProfesor/:idProfesor"),
    eliminarProfesor: environment.serverUrl.concat("api/profesores/eliminarProfesor/:idProfesor"),
    obtenerProfesorPorID: environment.serverUrl.concat("api/profesores/obtenerProfesorPorID/:idProfesor"),
    obtenerProfesores: environment.serverUrl.concat("api/profesores/obtenerProfesores")
}