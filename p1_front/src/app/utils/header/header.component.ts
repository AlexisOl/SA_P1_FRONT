import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  element = document.querySelector('html')
toggleDarkMode() {
        if (this.element !== null) {
          this.element.classList.toggle('dark')
      }
}
}
