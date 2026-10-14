import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Proyecto académico</p>
        <h1>Acerca de Motor 360</h1>
        <p>Una plataforma de noticias del sector automotriz y motociclístico.</p>
      </div>
    </section>

    <section class="section container about-grid">
      <article class="panel">
        <h2>Objetivo</h2>
        <p>
          Motor 360 presenta contenido de carros, motos, movilidad, eventos y tecnología
          mediante una navegación visual y sencilla.
        </p>
      </article>

      <article class="panel">
        <h2>Evolución del proyecto</h2>
        <p>
          La entrega final incorpora Angular con componentes standalone, rutas, interpolación,
          property binding, event binding y two-way binding.
        </p>
      </article>

      <article class="panel">
        <h2>Tecnologías</h2>
        <p>Angular, TypeScript, HTML, CSS, JSON, localStorage, Git y GitHub Actions.</p>
      </article>

      <article class="panel">
        <h2>Gestión básica</h2>
        <p>El mini CRUD permite crear y eliminar noticias almacenadas localmente.</p>
        <a class="btn btn-secondary" routerLink="/gestion">Abrir gestión</a>
      </article>
    </section>
  `
})
export class AboutComponent {}
