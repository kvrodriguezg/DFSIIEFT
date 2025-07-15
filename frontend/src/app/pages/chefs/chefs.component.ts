import { Component, OnInit } from '@angular/core';
import { ChefsService, Chef } from '../../services/chefs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs: Chef[] = [];
  esAdmin: boolean = false;

  formulario: Chef = {
    id: 0,
    nombre: '',
    pais: '',
    especialidad: '',
    foto: ''
  };

  editando: boolean = false;

  constructor(
    private chefsService: ChefsService,
    private authService: AuthService
  ) {}

  //Al iniciar
  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.esAdmin = user && user.tipo === 'admin';

    this.chefsService.getChefs().subscribe(data => {
      this.chefs = data;
    });
  }

  //Guardar Chef
  guardar(): void {
    if (this.editando) {
      this.chefsService.actualizarChef(this.formulario).subscribe(actualizado => {
        const index = this.chefs.findIndex(c => c.id === actualizado.id);
        if (index !== -1) {
          this.chefs[index] = actualizado;
        }
        this.cancelar();
      });
    } else {
      this.chefsService.agregarChef(this.formulario).subscribe(nuevo => {
        this.chefs.push(nuevo);
        this.cancelar();
      });
    }
  }

  //Editar Chef
  editar(chef: Chef): void {
    this.formulario = { ...chef };
    this.editando = true;
  }

  //Eliminar Chef
  eliminar(id: number): void {
    this.chefsService.eliminarChef(id).subscribe(() => {
      this.chefs = this.chefs.filter(c => c.id !== id);
    });
  }

  //Cancelar
  cancelar(): void {
    this.editando = false;
    this.formulario = {
      id: 0,
      nombre: '',
      pais: '',
      especialidad: '',
      foto: ''
    };
  }
}