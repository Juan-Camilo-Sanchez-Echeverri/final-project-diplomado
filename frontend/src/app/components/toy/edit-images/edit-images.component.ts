import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ToyService } from '../../../services/toy.service';
import { Toy } from '../../../interfaces/toy.interfaces';

@Component({
  selector: 'app-edit-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.css'],
})
export class EditImagesComponent implements OnInit {
  toyId: string;
  toy: Toy | null = null;
  coverFile: File | null = null;
  additionalFiles: File[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    readonly toyService: ToyService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.toyId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadToy();
  }

  loadToy(): void {
    this.isLoading = true;
    this.toyService.getToyById(this.toyId).subscribe({
      next: (toy) => {
        this.toy = toy;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al cargar el juguete', 'Error');
      },
    });
  }

  handleCoverInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && this.isValidImage(file)) {
      this.coverFile = file;
    } else {
      this.toastr.error('Formato de imagen no válido', 'Error');
    }
  }

  handleAdditionalFilesInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.additionalFiles = Array.from(files).filter((file) =>
        this.isValidImage(file)
      );
      if (this.additionalFiles.length !== files.length) {
        this.toastr.error(
          'Algunos archivos tienen un formato no válido',
          'Error'
        );
      }
    }
  }

  handleImageUpdate(imageId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && this.isValidImage(file)) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('image', file);

      this.toyService.updateImage(this.toyId, imageId, formData).subscribe({
        next: () => {
          this.toastr.success('Imagen actualizada exitosamente', 'Éxito');
          this.loadToy();
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error('Error al actualizar la imagen', 'Error');
        },
      });
    } else {
      this.toastr.error('Formato de imagen no válido', 'Error');
    }
  }

  handleImageDelete(imageId: string): void {
    this.isLoading = true;
    this.toyService.deleteImage(this.toyId, imageId).subscribe({
      next: () => {
        this.toastr.success('Imagen eliminada exitosamente', 'Éxito');
        this.loadToy();
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al eliminar la imagen', 'Error');
      },
    });
  }

  isValidImage(file: File): boolean {
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    return validFormats.includes(file.type);
  }

  uploadCover(): void {
    if (!this.coverFile) {
      this.toastr.error('Debe seleccionar una portada', 'Error');
      return;
    }

    this.isLoading = true;

    this.toyService.uploadCover(this.toyId, this.coverFile).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Portada actualizada exitosamente', 'Éxito');
        this.loadToy();
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al actualizar la portada', 'Error');
      },
    });
  }

  uploadAdditionalImages(): void {
    if (this.additionalFiles.length === 0) {
      this.toastr.error(
        'Debe seleccionar al menos una imagen adicional',
        'Error'
      );
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    this.additionalFiles.forEach((file) => {
      formData.append('images', file);
    });

    this.toyService.uploadAdditionalImages(this.toyId, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success(
          'Imágenes adicionales subidas exitosamente',
          'Éxito'
        );
        this.loadToy();
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al subir las imágenes adicionales', 'Error');
      },
    });
  }
}
