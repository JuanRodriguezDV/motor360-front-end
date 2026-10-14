import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" routerLink="/">Motor <span>360</span></a>
        <nav class="main-nav" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">
            Favoritos <span class="badge">{{ newsService.favoriteIds().length }}</span>
          </a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
          <a routerLink="/acerca" routerLinkActive="active">Acerca de</a>
        </nav>
      </div>
    </header>

    <router-outlet />

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <strong class="brand footer-brand">Motor <span>360</span></strong>
          <p>Pasión, información y tecnología sobre ruedas.</p>
        </div>
        <div>
          <p><strong>Proyecto académico Front End</strong></p>
          <p>HTML · CSS · JavaScript · Angular · localStorage · JSON</p>
        </div>
      </div>
    </footer>
  `
})
export class AppComponent {
  constructor(public readonly newsService: NewsService) {}
}
