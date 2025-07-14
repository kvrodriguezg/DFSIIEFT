import { Component, OnInit } from '@angular/core';
import { ChefsService } from '../services/chefs.service';
import { AuthService } from '../services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs: any[] = [];
  esAdmin: boolean = false;

  nuevoChef = { nombre: '', pais: '', especialidad: '', foto: '' };

  // 🔄 Edición
  chefEditando: any = null;

  constructor(
    private chefsService: ChefsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.esAdmin = user && user.tipo === 'admin';

    /* Obtener desde Git
    this.chefsService.getChefs().subscribe(data => {
       this.chefs = data;
     });*/

    //Obtener datos locales
    this.chefsService.getChefs().subscribe(data => {
      this.chefs = data;
    })
  }

  agregarChef() {
    if (this.nuevoChef.nombre && this.nuevoChef.pais && this.nuevoChef.especialidad && this.nuevoChef.foto) {
      this.chefsService.agregarChef(this.nuevoChef).subscribe(chef => {
        this.chefs.push(chef);
        this.nuevoChef = { nombre: '', pais: '', especialidad: '', foto: '' };
      });
    }
  }

  eliminarChef(id: number) {
    this.chefsService.eliminarChef(id).subscribe(() => {
      this.chefs = this.chefs.filter(c => c.id !== id);
    });
  }

  abrirModalEditar(chef: any) {
    this.chefEditando = { ...chef }; // clonamos para no modificar directamente
    const modal = document.getElementById('modalEditarChef');
    if (modal) new bootstrap.Modal(modal).show();
  }

  guardarEdicion() {
    if (!this.chefEditando) return;
    this.chefsService.actualizarChef(this.chefEditando.id, this.chefEditando).subscribe(actualizado => {
      const index = this.chefs.findIndex(c => c.id === actualizado.id);
      if (index !== -1) this.chefs[index] = actualizado;
      this.chefEditando = null;
    });

    const modalElement = document.getElementById('modalEditarChef');
    const modalInstance = bootstrap.Modal.getInstance(modalElement!);
    modalInstance?.hide();
  }
}