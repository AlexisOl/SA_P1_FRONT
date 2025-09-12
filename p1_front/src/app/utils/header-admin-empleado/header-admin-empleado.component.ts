import { Component, inject, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from '../../services/usuario/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-header-admin-empleado',
  imports: [Button,
        MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,
        MegaMenuModule, RouterLink, SplitButtonModule],
  templateUrl: './header-admin-empleado.component.html',
  styleUrl: './header-admin-empleado.component.css'
})
export class HeaderAdminEmpleadoComponent implements OnInit {
    items: MegaMenuItem[] | undefined;
    // para el split

    opcionesUsuarioMenu: MenuItem[] = []

    authServicio = inject(AuthService)

    isDark = false;
    element = document.querySelector('html')
    toggleDarkMode() {
        this.isDark = !this.isDark
        if (this.element !== null) {
            this.element.classList.toggle('dark', this.isDark)
        }
    }


    constructor() {
        this.opcionesUsuarioMenu = [


            {
                label: 'Cerrar sesion',
                command: () => {
                    this.authServicio.logout();
                }
            },
        ];

    }

    ngOnInit() {
        this.items = [
                 {
                label: 'General',
                root: true,
                direccion:'/admin/',


            },
            {
                label: 'Informacion Empresarial',
                root: true,
                direccion: '/admin/informacionEmpresarial'

            },
            {
                label: 'Hotel',
                root: true,
                direccion: '/hotel_restaurante/hoteles',
                items: [
                    [
                        {
                                                       items: [
                                { label: 'Hotel', icon: 'pi pi-list', direccion: '/hotel_restaurante/hoteles', },
                                { label: 'Reservaciones', icon: 'pi pi-list', direccion: '/hotel_restaurante/reservaciones' },
                            ]
                        }
                    ],


                ]
            },
            {
                label: 'Restaurantes',
                root: true,
                direccion: '/hotel_restaurante/restaurantes',
                                items: [
                    [
                        {
                                                       items: [
                                { label: 'Restaurantes', icon: 'pi pi-list', direccion: '/hotel_restaurante/restaurantes', },
                                { label: 'Compras', icon: 'pi pi-list', direccion: '/hotel_restaurante/comprasRestaurante/' },
                            ]
                        }
                    ],


                ]

            },

            {
                label: 'Facturacion',
                root: true,
                direccion: ''

            }
        ];
    }




  }
