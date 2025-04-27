import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { ToyService } from '../../../services/toy.service';
import { Toy } from '../../../interfaces/toy.interfaces';
import { TOY_CATEGORIES } from '../../../constants';

@Component({
  selector: 'app-edit-toy',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-toy.component.html',
  styleUrls: ['./edit-toy.component.css'],
})
export class EditToyComponent implements OnInit {
  toyForm: FormGroup;
  isLoading = false;
  toyId: string;
  categories = TOY_CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private toyService: ToyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.toyForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''],
    });
    this.toyId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadToy();
  }

  loadToy(): void {
    this.isLoading = true;
    this.toyService.getToyById(this.toyId).subscribe({
      next: (toy) => {
        this.toyForm.patchValue(toy);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al cargar el juguete', 'Error');
      },
    });
  }

  handleSubmit(): void {
    if (this.toyForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    this.isLoading = true;
    const toyData: Toy = this.toyForm.value;

    this.toyService.updateToy(this.toyId, toyData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Juguete actualizado exitosamente', 'Éxito');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Error al actualizar el juguete', 'Error');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
