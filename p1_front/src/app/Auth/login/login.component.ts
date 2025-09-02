import { Component } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FocusTrapModule,ButtonModule, 
    RouterLink, 
    FormsModule, InputTextModule, CheckboxModule, IconFieldModule, InputIconModule, AutoFocusModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    name: string = '';
    email: string = '';
    accept: boolean = false;
    password!: boolean
    rememberMe!: boolean
    
}
