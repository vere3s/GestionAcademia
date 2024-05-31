import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Grupo } from '../../interfaces/grupo.interface';
import { GruposService } from '../../services/grupos.service';
import { parsearErroresAPI } from '../../utils/Utilities';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-grupo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-grupo.component.html',
  styleUrl: './agregar-grupo.component.scss'
})
export class AgregarGrupoComponent implements OnInit {
// Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
form: FormGroup;
// Creacion de objeto que se enviara a traves del endpoint
  formGrupo: Grupo;
// Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
// Variable que almacena el ID del grupo
  idGrupo!: number;
// Inyeccion de dependencias
  private readonly formBuilder = inject(FormBuilder);
  private readonly grupoService = inject(GruposService);
  private readonly router = inject(Router);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
constructor() {
// Se inicializa el objeto grupo que se enviara
  this.formGrupo = {} as Grupo;
  // Se inicia el controlador del formulario
  this.form = this.formBuilder.group({
    idCarrera: ['',[Validators.required]],
    idMateria: ['', [Validators.required]],
    idProfesor: ['', [Validators.required]],
    ciclo: ['', [Validators.required]],
    anio: ['', [Validators.required]]
  });
  }
  ngOnInit(): void {
      // Se inicializa el observable de ruta
      this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
        this.idGrupo = temp['idGrupo'];
      });
      // Se valida que el valor del idGrupo sea mayor a cero y distinto de nulo.
      if(this.idGrupo && this.idGrupo > 0 ){
          // Es edicion
          // Se consulta la informacion del grupo, para rellenar el formulario
          this.grupoService.obtenerGrupoPorID(this.idGrupo).subscribe({
            next: (temp) => {
            this.formGrupo = temp;
            // Se rellena la informacion del formulario
            this.form.controls['idCarrera'].setValue(this.formGrupo.idCarrera);
            this.form.controls['idMateria'].setValue(this.formGrupo.idMateria);
            this.form.controls['idProfesor'].setValue(this.formGrupo.idProfesor);
            this.form.controls['ciclo'].setValue(this.formGrupo.ciclo);
            this.form.controls['anio'].setValue(this.formGrupo.anio);
          },
            error: (err) => {
            console.log("Error: ", err);
            }
          });
      }
  }
  onSubmit(){
    // Asignacion de valores
    this.formGrupo.idCarrera = this.form.get('idCarrera')?.value;
    this.formGrupo.idMateria = this.form.get('idMateria')?.value;
    this.formGrupo.idProfesor = this.form.get('idProfesor')?.value;
    this.formGrupo.ciclo = this.form.get('ciclo')?.value;
    this.formGrupo.anio = this.form.get('anio')?.value;
    // Mostrar dialogo
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });

    Swal.showLoading();

    // Se valida si la variable idGrupo contiene valor, los escenarios son:
    // 1. Si el idGrupo existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idGrupo no existe entonces se debe realizar una inserccion
    if(this.idGrupo && this.idGrupo > 0){
        this.grupoService.actualizarGrupo(this.idGrupo,this.formGrupo).subscribe({
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
        title: 'Error al actualizar grupo',
        text: parsearErroresAPI(err).toString()
        });
       }
      })
    } else {
        // Es insercion
        this.grupoService.agregarGrupo(this.formGrupo).subscribe({
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
              title: 'Error al insertar grupo',
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

