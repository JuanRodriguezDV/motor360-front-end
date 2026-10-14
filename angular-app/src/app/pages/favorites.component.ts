import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Tu selección</p>
        <h1>Favoritos</h1>
        <p>Las noticias guardadas se conservan en localStorage.</p>
      </div>
    </section>

    <section class="section container">
      <div class="card-grid" *ngIf="favorites.length; else emptyState">
        <article class="news-card" *ngFor="let item of favorites">
          <img [src]="item.imagen" [alt]="item.titulo">
          <div class="news-card-body">
            <span class="tag">{{ item.categoria }}</span>
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.resumen }}</p>
            <div class="card-actions">
              <a class="btn btn-small" [routerLink]="['/noticias', item.id]">Ver más</a>
              <button class="icon-btn" type="button" (click)="remove(item.id)">♥</button>
            </div>
          </div>
        </article>
      </div>

      <ng-template #emptyState>
        <div class="empty-state">
          <h2>Aún no tienes favoritos</h2>
          <p>Guarda las noticias que quieras consultar más adelante.</p>
          <a class="btn" routerLink="/noticias">Explorar noticias</a>
        </div>
      </ng-template>
    </section>
  `
})
export class FavoritesComponent implements OnInit {
  private all: NewsItem[] = [];
  favorites: NewsItem[] = [];

  constructor(public readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((items) => {
      this.all = items;
      this.refresh();
    });
  }

  remove(id: number): void {
    this.newsService.toggleFavorite(id);
    this.refresh();
  }

  private refresh(): void {
    this.favorites = this.all.filter((item) => this.newsService.isFavorite(item.id));
  }
}
