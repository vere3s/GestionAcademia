import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Profesor } from '../../interfaces/profesor.interface';
import { ProfesoresService } from '../../services/profesores.service';
import { parsearErroresAPI } from '../../utils/Utilities';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-profesor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-profesor.component.html',
  styleUrl: './agregar-profesor.component.scss'
})
export class AgregarProfesorComponent implements OnInit {
// Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
form: FormGroup;
// Creacion de objeto que se enviara a traves del endpoint
  formProfesor: Profesor;
// Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
// Variable que almacena el ID del profesor
  idProfesor!: number;
// Inyeccion de dependencias
  private readonly formBuilder = inject(FormBuilder);
  private readonly profesorService = inject(ProfesoresService);
  private readonly router = inject(Router);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
constructor() {
// Se inicializa el objeto profesor que se enviara
  this.formProfesor = {} as Profesor;
  // Se inicia el controlador del formulario
  this.form = this.formBuilder.group({
    nombresProfesor: ['',[Validators.required]],
    apellidosProfesor: ['', [Validators.required]],
    email: ['',[Validators.required, Validators.email]]
  });
  }
  ngOnInit(): void {
      // Se inicializa el observable de ruta
      this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
        this.idProfesor = temp['idProfesor'];
      });
      // Se valida que el valor del idProfesor sea mayor a cero y distinto de nulo.
      if(this.idProfesor && this.idProfesor > 0 ){
          // Es edicion
          // Se consulta la informacion del profesor, para rellenar el formulario
          this.profesorService.obtenerProfesorPorID(this.idProfesor).subscribe({
            next: (temp) => {
            this.formProfesor = temp;
            // Se rellena la informacion del formulario
            this.form.controls['nombresProfesor'].setValue(this.formProfesor.nombresProfesor);
            this.form.controls['apellidosProfesor'].setValue(this.formProfesor.apellidosProfesor);
            this.form.controls['email'].setValue(this.formProfesor.email);
          },
            error: (err) => {
            console.log("Error: ", err);
            }
          });
      }
  }
  onSubmit(){
    // Asignacion de valores
    this.formProfesor.nombresProfesor = this.form.get('nombresProfesor')?.value;
    this.formProfesor.apellidosProfesor = this.form.get('apellidosProfesor')?.value;
    this.formProfesor.email = this.form.get('email')?.value;
    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });

    Swal.showLoading();

    // Se valida si la variable idProfesor contiene valor, los escenarios son:
    // 1. Si el idProfesor existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idProfesor no existe entonces se debe realizar una inserccion
    if(this.idProfesor && this.idProfesor > 0){
        this.profesorService.actualizarProfesor(this.idProfesor,this.formProfesor).subscribe({
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
        title: 'Error al actualizar profesor',
        text: parsearErroresAPI(err).toString()
        });
       }
      })
    } else {
        // Es insercion
        this.profesorService.agregarProfesor(this.formProfesor).subscribe({
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
              title: 'Error al insertar profesor',
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
