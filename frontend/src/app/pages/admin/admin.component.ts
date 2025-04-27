import { Component, OnInit } from '@angular/core';
import { ToyService } from '../../services/toy.service';
import { Toy } from '../../interfaces/toy.interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  toys: Toy[] = [];
  isLoading = false;

  constructor(
    private toyService: ToyService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadToys();
  }

  loadToys(): void {
    this.isLoading = true;
    this.toyService.getToys().subscribe({
      next: (toys) => {
        this.toys = toys;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al cargar los juguetes', 'Error');
      },
    });
  }

  editToy(toyId: string): void {
    this.router.navigate(['/edit-toy', toyId]);
  }

  deleteToy(toyId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este juguete?')) {
      this.toyService.deleteToy(toyId).subscribe({
        next: () => {
          this.toastr.success('Juguete eliminado exitosamente', 'Éxito');
          this.loadToys();
        },
        error: () => {
          this.toastr.error('Error al eliminar el juguete', 'Error');
        },
      });
    }
  }

  navigateToEditImages(toyId: Toy['_id']): void {
    this.router.navigate(['/edit-images', toyId]);
  }
}
