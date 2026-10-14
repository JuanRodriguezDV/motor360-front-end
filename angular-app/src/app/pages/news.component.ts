import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Motor 360</p>
        <h1>Noticias recientes</h1>
        <p>Busca y filtra contenido por categoría usando data binding de Angular.</p>
      </div>
    </section>

    <section class="section container">
      <div class="filter-bar">
        <label>
          <span>Buscar</span>
          <input [(ngModel)]="search" placeholder="Ej. eléctrico, moto, tecnología">
        </label>
        <label>
          <span>Categoría</span>
          <select [(ngModel)]="category">
            <option>Todas</option>
            <option *ngFor="let option of categories">{{ option }}</option>
          </select>
        </label>
      </div>

      <p class="result-count">{{ filtered.length }} noticia(s) encontradas</p>

      <div class="card-grid" *ngIf="filtered.length; else emptyState">
        <article class="news-card" *ngFor="let item of filtered">
          <img [src]="item.imagen" [alt]="item.titulo">
          <div class="news-card-body">
            <span class="tag">{{ item.categoria }}</span>
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.resumen }}</p>
            <small>{{ item.fecha }}</small>
            <div class="card-actions">
              <a class="btn btn-small" [routerLink]="['/noticias', item.id]">Ver más</a>
              <button class="icon-btn" type="button" (click)="newsService.toggleFavorite(item.id)">
                {{ newsService.isFavorite(item.id) ? '♥' : '♡' }}
              </button>
            </div>
          </div>
        </article>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">No encontramos noticias con esos filtros.</div>
      </ng-template>
    </section>
  `
})
export class NewsComponent implements OnInit {
  items: NewsItem[] = [];
  search = '';
  category = 'Todas';
  readonly categories = ['Carros', 'Motos', 'Tecnología', 'Movilidad', 'Eventos', 'Comparativas'];

  constructor(public readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((items) => {
      this.items = items;
    });
  }

  get filtered(): NewsItem[] {
    const query = this.search.trim().toLowerCase();

    return this.items.filter((item) => {
      const byCategory = this.category === 'Todas' || item.categoria === this.category;
      const byText = `${item.titulo} ${item.resumen} ${item.categoria}`
        .toLowerCase()
        .includes(query);
      return byCategory && byText;
    });
  }
}
