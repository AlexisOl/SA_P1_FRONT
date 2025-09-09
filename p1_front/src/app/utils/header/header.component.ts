import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterLink } from '@angular/router'

import { SplitButtonModule } from 'primeng/splitbutton';
import { AuthService } from '../../services/usuario/auth.service';
@Component({
    selector: 'app-header',
    imports: [Button,
        MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,
        MegaMenuModule, RouterLink, SplitButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
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


            { label: 'Ver perfil', url: 'https://angular.dev' },
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
                direccion: '/hotel_restaurante/restaurantes'

            },

            {
                label: 'Facturacion',
                root: true,
                direccion: ''

            }
        ];
    }





}

