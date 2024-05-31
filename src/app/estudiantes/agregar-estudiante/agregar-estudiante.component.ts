import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudiantesService } from '../../services/estudiantes.service';
import { parsearErroresAPI } from '../../utils/Utilities';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-estudiante.component.html',
  styleUrl: './agregar-estudiante.component.scss'
})
export class AgregarEstudianteComponent implements OnInit{
    // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
    form: FormGroup;
    // Creacion de objeto que se enviara a traves del endpoint
    formEstudiante: Estudiante;
    // Variable que permite manejar la subscripcion al observable de ruta.
    onRouteStart!: Subscription;
    // Variable que almacena el ID del estudiante
    idEstudiante!: number;
    // Inyeccion de dependencias
    private readonly formBuilder = inject(FormBuilder);
    private readonly estudianteService = inject(EstudiantesService);
    private readonly router = inject(Router);
    private readonly activedRoute = inject(ActivatedRoute);
    private readonly location = inject(Location);
    constructor() {
    // Se inicializa el objeto estudiante que se enviara
    this.formEstudiante = {} as Estudiante;
    // Se inicia el controlador del formulario
    this.form = this.formBuilder.group({
    nombresEstudiante: ['',[Validators.required]],
    apellidosEstudiante: ['', [Validators.required]],
    codigoEstudiante: ['', [Validators.required]],
    correoEstudiante: ['',[Validators.required, Validators.email]]
  });
}
    ngOnInit(): void {
    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
    // Se almacena el valor capturado en la ruta.
      this.idEstudiante = temp['idEstudiante'];
    });
    // Se valida que el valor del idEstudiante sea mayor a cero y distinto de nulo.
    if(this.idEstudiante && this.idEstudiante > 0 ){
    // Es edicion
    // Se consulta la informacion del estudiante, para rellenar el formulario
    this.estudianteService.obtenerEstudiantePorID(this.idEstudiante).subscribe({
    next: (temp) => {
    this.formEstudiante = temp;
    // Se rellena la informacion del formulario
    this.form.controls['nombresEstudiante'].setValue(this.formEstudiante.nombresEstudiante);
    this.form.controls['apellidosEstudiante'].setValue(this.formEstudiante.apellidosEstudiante);
    this.form.controls['codigoEstudiante'].setValue(this.formEstudiante.codigoEstudiante);
    this.form.controls['correoEstudiante'].setValue(this.formEstudiante.correoEstudiante);
  },
    error: (err) => {
    console.log("Error: ", err);
    }
  });
 }
}
    onSubmit(){
    // Asignacion de valores
    this.formEstudiante.nombresEstudiante = this.form.get('nombresEstudiante')?.value;
    this.formEstudiante.apellidosEstudiante = this.form.get('apellidosEstudiante')?.value;
    this.formEstudiante.codigoEstudiante = this.form.get('codigoEstudiante')?.value;
    this.formEstudiante.correoEstudiante = this.form.get('correoEstudiante')?.value;
    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });

    Swal.showLoading();

    // Se valida si la variable idEstudiante contiene valor, los escenarios son:
    // 1. Si el idEstudiante existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idEstudiante no existe entonces se debe realizar una inserccion
    if(this.idEstudiante && this.idEstudiante > 0){
        this.estudianteService.actualizarEstudiante(this.idEstudiante,this.formEstudiante).subscribe({
        // Respuesta exitosa
        next: (temp) => {
        Swal.fire("Actualizado","Registro actualizado con exito","success");
        // Navegar hacia atras
        //this.router.navigate(['']);
        this.location.back()
      },
      // En caso de error
      error: (err) => {
        Swal.fire({
        icon: 'error',
        title: 'Error al actualizar persona',
        text: parsearErroresAPI(err).toString()
        });
       }
      })
    } else {
        // Es insercion
        this.estudianteService.agregarEstudiante(this.formEstudiante).subscribe({
          // Respuesta exitosa
          next: (temp) => {
          Swal.fire("Registrado","Registro insertado con éxito","success");
          // Navegar hacia atras
          //this.router.navigate(['']);
          this.location.back()
          },
          // En caso de error
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al insertar persona',
              text: parsearErroresAPI(err).toString()
             });
           }
        })
    }
  }
        /* Funcion que permite validar los campos del formulario
        trabaja evaluando si el campo ha sido manipulado o esta vacio*/
        validateField(field: string){
        return this.form.get(field)?.invalid && this.form.get(field)?.touched;
    }
}
