import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToyService } from '../../../services/toy.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toy } from '../../../interfaces/toy.interfaces';
import { TOY_CATEGORIES } from '../../../constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-toy',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-toy.component.html',
  styleUrls: ['./create-toy.component.css'],
})
export class CreateToyComponent {
  toyForm: FormGroup;
  isLoading = false;
  categories = TOY_CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private toyService: ToyService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.toyForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''],
    });
  }

  handleSubmit(): void {
    if (this.toyForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    this.isLoading = true;
    const toyData: Toy = this.toyForm.value;

    this.toyService.createToy(toyData).subscribe({
      next: (toy) => {
        this.isLoading = false;
        this.toastr.success('Juguete creado exitosamente', 'Éxito');
        this.router.navigate(['/upload-images', toy._id]);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error en la creación del juguete', 'Error');
      },
    });
  }
}
