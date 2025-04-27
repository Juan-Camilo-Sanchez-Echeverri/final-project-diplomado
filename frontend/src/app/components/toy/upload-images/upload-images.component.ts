import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ToyService } from '../../../services/toy.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
})
export class UploadImagesComponent implements OnInit {
  toyId: string;
  coverFile: File | null = null;
  additionalFiles: File[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private toyService: ToyService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.toyId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {}

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
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isValidImage(file)) {
          this.additionalFiles.push(file);
        } else {
          this.toastr.error('Formato de imagen no válido', 'Error');
        }
      }
    }
  }

  isValidImage(file: File): boolean {
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    return validFormats.includes(file.type);
  }

  uploadImages(): void {
    if (!this.coverFile) {
      this.toastr.error('Debe seleccionar una portada', 'Error');
      return;
    }

    this.isLoading = true;

    this.toyService.uploadCover(this.toyId, this.coverFile).subscribe({
      next: () => {
        if (this.additionalFiles.length > 0) {
          this.uploadAdditionalImages();
        } else {
          this.isLoading = false;
          this.toastr.success('Portada subida exitosamente', 'Éxito');
          this.router.navigate(['/admin']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error en la subida de la portada', 'Error');
      },
    });
  }

  uploadAdditionalImages(): void {
    const formData = new FormData();
    for (let file of this.additionalFiles) {
      formData.append('images', file);
    }

    this.toyService.uploadAdditionalImages(this.toyId, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Imágenes subidas exitosamente', 'Éxito');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error(
          'Error en la subida de las imágenes adicionales',
          'Error'
        );
        this.router.navigate(['/admin']);
      },
    });
  }
}
