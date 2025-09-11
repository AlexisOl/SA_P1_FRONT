import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { PanelModule } from 'primeng/panel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { EmpleadoRestauranteService } from '../../services/usuario/empleado-restaurante.service';
import { empleadoRestaurante, persona } from '../../Models/Usuario';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { restaurantes } from '../../Models/Restaurantes';
import { RestauranteServicioService } from '../../services/restaurante/restaurante-servicio.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
@Component({
  selector: 'app-empleados-restaurante',
  imports: [HeaderComponent, PanelModule, TableModule, ButtonModule, CommonModule, FieldsetModule,
    IconFieldModule, InputIconModule, DialogModule, FormsModule
  ],
  templateUrl: './empleados-restaurante.component.html',
  styleUrl: './empleados-restaurante.component.css'
})
export class EmpleadosRestauranteComponent implements OnInit{

  idRestaurante!:String
  listadoEmpleados: empleadoRestaurante[] =[]
  visibleCrearEmpleado:boolean=false
  restauranteEspecifico!: restaurantes 
  empleadoRestaurante= inject(EmpleadoRestauranteService)
  restauranteServicio= inject(RestauranteServicioService)
  AlertaServicio= inject(AlertaServicioService)


  // para crear
  nuevoEmpleado = {
  cui: null,
  nombre: '',
  fechaNacimiento: new Date(),
  direccion: '',
  telefono: '',
  correo: '',
  restauranteId: this.idRestaurante,
  salario: null,
  fecha: new Date(),
  username: '',
  password: ''
};


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
        this.idRestaurante = this.route.snapshot.paramMap.get('id')!;

        this.empleadoRestaurante.listarEmpleados(this.idRestaurante).subscribe(
            (elementos) => {
                this.listadoEmpleados = elementos
                console.log(elementos);
                
            }
        )

                this.restauranteServicio.listarRestauranteEspecifico(this.idRestaurante).subscribe(
            (elementos) => {
                this.restauranteEspecifico = elementos
                console.log(elementos);
                
            }
        )

  }

  cambiarEstado(){

  }


  verDialogoNuevoEmpleado() {
    this.visibleCrearEmpleado = true
  }
  guardarEmpleado(){

    this.nuevoEmpleado.restauranteId=this.idRestaurante
    this.nuevoEmpleado.fecha =new Date(this.nuevoEmpleado.fecha)
    this.nuevoEmpleado.fechaNacimiento =new Date(this.nuevoEmpleado.fechaNacimiento)

    console.log(this.nuevoEmpleado);
    
     this.empleadoRestaurante.crearEmpleadosRestaurante(this.nuevoEmpleado).subscribe(
      (next) => {
        this.visibleCrearEmpleado=false
             this.AlertaServicio.generacionAlerta(
        'Éxito', 'EL empleado fue ingresada correctamente.', 'success'
        )
        
      }, (error) => {
        this.visibleCrearEmpleado=false

           this.AlertaServicio.generacionAlerta(
          'Error', 'Hubo un problema al generar el nuevo empleado.', 'error'
        )

      }
     )
  }

}
