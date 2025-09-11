import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { EmpleadoHotelService } from '../../services/usuario/empleado-hotel.service';
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { hotel } from '../../Models/Hotel';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { empleadoHotel } from '../../Models/Usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-empleados-hotel',
  imports: [HeaderComponent, PanelModule, TableModule, ButtonModule, 
    PanelModule, TableModule, ButtonModule, CommonModule, FieldsetModule,
    IconFieldModule, InputIconModule, DialogModule, FormsModule
  ],
  templateUrl: './empleados-hotel.component.html',
  styleUrl: './empleados-hotel.component.css'
})
export class EmpleadosHotelComponent implements OnInit {

  idHotel!: String
  empleadoHotel = inject(EmpleadoHotelService)
  hotelServicio = inject(HotelServicioService)
  visibleCrearEmpleado: boolean = false
  hotelEspecifico!: hotel
  listadoEmpleados: empleadoHotel[] = []


  AlertaServicio = inject(AlertaServicioService)

 // para crear
  nuevoEmpleado = {
  cui: null,
  nombre: '',
  fechaNacimiento: new Date(),
  direccion: '',
  telefono: '',
  correo: '',
  idhotel: this.idHotel,
  salario: null,
  fecha: new Date(),
  username: '',
  password: ''
};


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;


    this.empleadoHotel.listarEmpleados(Number(this.idHotel)).subscribe(
      (elementos) => {
        this.listadoEmpleados = elementos
        console.log(elementos);

      }
    )

    this.hotelServicio.listarHotelEspecifico(this.idHotel).subscribe(
      (elementos) => {
        this.hotelEspecifico = elementos
        console.log(elementos);

      }
    )

  }


  cambiarEstado() {

  }
  verDialogoNuevoEmpleado() {
    this.visibleCrearEmpleado = true
  }
  guardarEmpleado() {

    this.nuevoEmpleado.idhotel=this.idHotel
    this.nuevoEmpleado.fecha =new Date(this.nuevoEmpleado.fecha)
    this.nuevoEmpleado.fechaNacimiento =new Date(this.nuevoEmpleado.fechaNacimiento)

    console.log(this.nuevoEmpleado);

     this.empleadoHotel.crearEmpleadosHotel(this.nuevoEmpleado).subscribe(
      (next) => {
        this.visibleCrearEmpleado=false
             this.AlertaServicio.generacionAlerta(
        'Éxito', 'EL empleado fue ingresado correctamente.', 'success'
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
