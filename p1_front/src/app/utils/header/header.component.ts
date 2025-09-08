import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-header',
  imports: [Button,
    MenubarModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule,
    MegaMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  isDark = false;
  element = document.querySelector('html')
  toggleDarkMode() {
    this.isDark = !this.isDark
    if (this.element !== null) {
      this.element.classList.toggle('dark', this.isDark)
    }
  }


    ngOnInit() {
        this.items = [
            {
                label: 'General',
                root: true,
                items: [
                    [
                        {
                            items: [
                                { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
                                { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
                                { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
                            ]
                        }
                    ],
          
             
                ]
            },
                 {
                label: 'Hotel',
                root: true,
                direccion: '/hotel_restaurante/hoteles',
                       items: [
                    [
                        {
                            valores: [
                                { label: 'Reservaciones', icon: 'pi pi-list', subtext: 'Subtext of item' },
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

