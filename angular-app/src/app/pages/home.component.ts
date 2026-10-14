import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="container hero-content">
        <p class="eyebrow">Autos · Motos · Tecnología · Movilidad</p>
        <h1>Toda la actualidad del mundo motor <span>en un solo lugar</span></h1>
        <p class="lead">
          Noticias, lanzamientos, comparativas y tendencias con una experiencia visual
          moderna y fácil de consultar.
        </p>
        <a class="btn" routerLink="/noticias">Explorar noticias →</a>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selección Motor 360</p>
          <h2>Noticias destacadas</h2>
        </div>
        <a routerLink="/noticias">Ver todas →</a>
      </div>

      <div class="card-grid" *ngIf="featured$ | async as items">
        <article class="news-card" *ngFor="let item of items">
          <img [src]="item.imagen" [alt]="item.titulo">
          <div class="news-card-body">
            <span class="tag">{{ item.categoria }}</span>
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.resumen }}</p>
            <div class="card-actions">
              <a class="btn btn-small" [routerLink]="['/noticias', item.id]">Ver más</a>
              <button class="icon-btn" type="button" (click)="newsService.toggleFavorite(item.id)">
                {{ newsService.isFavorite(item.id) ? '♥' : '♡' }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section surface">
      <div class="container">
        <p class="eyebrow">Explora por categorías</p>
        <div class="category-grid">
          <a routerLink="/noticias" *ngFor="let category of categories">{{ category }}</a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  readonly categories = ['Carros', 'Motos', 'Tecnología', 'Movilidad', 'Eventos', 'Comparativas'];
  readonly featured$ = this.newsService.getNews().pipe(
    map((items) => items.filter((item) => item.destacada).slice(0, 4))
  );

  constructor(public readonly newsService: NewsService) {}
}
