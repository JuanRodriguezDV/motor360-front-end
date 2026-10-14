import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewsItem } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Mini CRUD</p>
        <h1>Gestión de noticias</h1>
        <p>Crea y elimina noticias usando almacenamiento local.</p>
      </div>
    </section>

    <section class="section container contact-layout">
      <form class="panel" #newsForm="ngForm" (ngSubmit)="create(newsForm)">
        <h2>Nueva noticia</h2>

        <label>
          Título *
          <input name="titulo" [(ngModel)]="draft.titulo" required>
        </label>

        <label>
          Categoría *
          <select name="categoria" [(ngModel)]="draft.categoria" required>
            <option>Carros</option>
            <option>Motos</option>
            <option>Tecnología</option>
            <option>Movilidad</option>
            <option>Eventos</option>
            <option>Comparativas</option>
          </select>
        </label>

        <label>
          Resumen *
          <textarea name="resumen" [(ngModel)]="draft.resumen" required></textarea>
        </label>

        <button class="btn" type="submit">Crear noticia</button>
      </form>

      <div class="panel">
        <h2>Noticias disponibles</h2>
        <div class="manage-row" *ngFor="let item of items">
          <div>
            <strong>{{ item.titulo }}</strong>
            <small>{{ item.categoria }}</small>
          </div>
          <button class="btn btn-secondary btn-small" type="button" (click)="remove(item.id)">Eliminar</button>
        </div>
      </div>
    </section>
  `
})
export class ManageComponent implements OnInit {
  items: NewsItem[] = [];
  draft = { titulo: '', categoria: 'Carros', resumen: '' };

  constructor(private readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.load();
  }

  create(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.newsService.createNews(this.draft);
    this.draft = { titulo: '', categoria: 'Carros', resumen: '' };
    form.resetForm(this.draft);
    this.load();
  }

  remove(id: number): void {
    this.newsService.deleteNews(id);
    this.load();
  }

  private load(): void {
    this.newsService.getNews().subscribe((items) => {
      this.items = items;
    });
  }
}
