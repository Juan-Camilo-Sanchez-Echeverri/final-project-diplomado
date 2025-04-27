import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Toy } from '../../../interfaces/toy.interfaces';
import { ToyService } from '../../../services/toy.service';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';
import { Comment, CommentDto } from '../../../interfaces/comment.interfaces';

@Component({
  selector: 'app-toy-detail',
  templateUrl: './toy-detail.component.html',
  styleUrls: ['./toy-detail.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class ToyDetailComponent implements OnInit {
  toy: Toy | null = null;
  commentForm: FormGroup;
  editCommentForm: FormGroup;
  isLoading = true;
  editingCommentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toyService: ToyService,
    private commentService: CommentService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.editCommentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    const toyId = this.route.snapshot.paramMap.get('id');
    if (toyId) {
      this.getToy(toyId);
    }
  }

  getToy(id: string): void {
    this.toyService.getToyById(id).subscribe({
      next: (toy) => {
        this.toy = toy;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Error al cargar el juguete');
        this.isLoading = false;
      },
    });
  }

  addComment(): void {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      this.toastr.warning('Debes iniciar sesión para comentar');
      return;
    }

    if (this.commentForm.valid) {
      const comment: CommentDto = {
        content: this.commentForm.value.content,
      };
      this.commentService.addComment(this.toy!._id, comment).subscribe({
        next: (response) => {
          this.toy!.comments.push(response);
          this.commentForm.reset();
          this.toastr.success('Comentario agregado exitosamente');
        },
        error: (err) => {
          this.toastr.error('Error al agregar el comentario');
        },
      });
    } else {
      this.toastr.warning('El comentario no puede estar vacío');
    }
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(this.toy!._id, commentId).subscribe({
      next: () => {
        this.toy!.comments = this.toy!.comments.filter(
          (comment) => comment._id !== commentId
        );
        this.toastr.success('Comentario eliminado exitosamente');
      },
      error: (err) => {
        this.toastr.error('Error al eliminar el comentario');
      },
    });
  }

  editComment(comment: Comment): void {
    this.editingCommentId = comment._id;
    this.editCommentForm.setValue({ content: comment.content });
  }

  updateComment(): void {
    if (this.editCommentForm.valid && this.editingCommentId) {
      const comment: CommentDto = {
        content: this.editCommentForm.value.content,
      };
      this.commentService
        .updateComment(this.toy!._id, this.editingCommentId, comment)
        .subscribe({
          next: (response) => {
            const index = this.toy!.comments.findIndex(
              (c) => c._id === this.editingCommentId
            );
            if (index !== -1) this.toy!.comments[index] = response;
            this.editingCommentId = null;
            this.editCommentForm.reset();
            this.toastr.success('Comentario actualizado exitosamente');
          },
          error: (err) => {
            this.toastr.error('Error al actualizar el comentario');
          },
        });
    } else {
      this.toastr.warning('El comentario no puede estar vacío');
    }
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editCommentForm.reset();
  }

  canEditOrDelete(comment: Comment): boolean {
    const currentUser = this.authService.getUser();
    if (currentUser) return comment.user._id === currentUser._id;

    return false;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
