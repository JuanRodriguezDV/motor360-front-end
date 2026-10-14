import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsItem } from '../news.model';
import { NewsService } from '../news.service';

@Component({
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <ng-container *ngIf="item; else notFound">
      <section class="detail-hero">
        <img [src]="item.imagen" [alt]="item.titulo">
      </section>

      <section class="section container detail-layout">
        <article>
          <span class="tag">{{ item.categoria }}</span>
          <h1>{{ item.titulo }}</h1>
          <p class="article-meta">{{ item.fecha }} · Equipo editorial Motor 360</p>
          <p class="lead">{{ item.resumen }}</p>
          <p>{{ item.contenido }}</p>
          <p>
            Esta vista usa parámetros de ruta, property binding y event binding para demostrar
            fundamentos básicos de Angular.
          </p>
        </article>

        <aside class="panel action-panel">
          <button class="btn full" type="button" (click)="newsService.toggleFavorite(item.id)">
            {{ newsService.isFavorite(item.id) ? '♥ Quitar de favoritos' : '♡ Agregar a favoritos' }}
          </button>
          <a class="btn btn-secondary full" routerLink="/contacto">Contactar</a>
          <a routerLink="/noticias">← Volver al listado</a>
        </aside>
      </section>
    </ng-container>

    <ng-template #notFound>
      <section class="section container">
        <div class="empty-state">
          <h2>Noticia no encontrada</h2>
          <a class="btn" routerLink="/noticias">Volver a noticias</a>
        </div>
      </section>
    </ng-template>
  `
})
export class DetailComponent implements OnInit {
  item?: NewsItem;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly newsService: NewsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getById(id).subscribe((item) => {
      this.item = item;
    });
  }
}
