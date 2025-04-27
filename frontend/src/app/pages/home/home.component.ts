import { Component, OnInit } from '@angular/core';
import { ToyService } from '../../services/toy.service';
import { CommonModule } from '@angular/common';
import { Toy } from '../../interfaces/toy.interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  toys: Toy[] = [];
  isLoading = true;

  constructor(private toyService: ToyService) {}

  ngOnInit(): void {
    this.getToys();
  }

  getToys(): Toy[] {
    this.toyService.getToys().subscribe({
      next: (toys) => {
        this.toys = toys;
        this.isLoading = false;
      },
      error: (err) => {
        alert('Error Al cargar los juguetes');
        this.isLoading = false;
      },
    });
    return this.toys;
  }

  getFullImageUrl(imageUrl: string): string {
    return this.toyService.getFullImageUrl(imageUrl);
  }
}
