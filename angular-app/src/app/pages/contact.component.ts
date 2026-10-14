import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Estamos siempre cerca</p>
        <h1>Contáctanos</h1>
        <p>Escríbenos si tienes una pregunta, sugerencia o propuesta de colaboración.</p>
      </div>
    </section>

    <section class="section container contact-layout">
      <form class="panel" #contactForm="ngForm" (ngSubmit)="submit(contactForm)" novalidate>
        <h2>Envíanos un mensaje</h2>

        <label>
          Nombre *
          <input name="nombre" [(ngModel)]="model.nombre" required #nombre="ngModel">
          <small class="field-error" *ngIf="nombre.invalid && nombre.touched">El nombre es obligatorio.</small>
        </label>

        <label>
          Correo electrónico *
          <input name="correo" [(ngModel)]="model.correo" required email #correo="ngModel">
          <small class="field-error" *ngIf="correo.invalid && correo.touched">Ingresa un correo válido.</small>
        </label>

        <label>
          Asunto *
          <select name="asunto" [(ngModel)]="model.asunto" required #asunto="ngModel">
            <option value="">Selecciona una opción</option>
            <option>Consulta general</option>
            <option>Sugerencia</option>
            <option>Colaboración</option>
          </select>
          <small class="field-error" *ngIf="asunto.invalid && asunto.touched">Selecciona un asunto.</small>
        </label>

        <label>
          Mensaje *
          <textarea name="mensaje" [(ngModel)]="model.mensaje" required minlength="10" #mensaje="ngModel"></textarea>
          <small class="field-error" *ngIf="mensaje.invalid && mensaje.touched">Escribe un mensaje de al menos 10 caracteres.</small>
        </label>

        <button class="btn" type="submit">Enviar mensaje</button>
        <p class="success-message" *ngIf="sent">¡Mensaje enviado! Hemos recibido tu información.</p>
      </form>

      <aside class="panel contact-info">
        <h2>Datos de contacto</h2>
        <p><strong>Correo</strong><br>hola&#64;motor360.com</p>
        <p><strong>Teléfono</strong><br>+57 601 745 2300</p>
        <p><strong>Ubicación</strong><br>Bogotá, Colombia</p>
        <p><strong>Horario</strong><br>Lunes a viernes · 8:00 a.m. - 6:00 p.m.</p>
      </aside>
    </section>
  `
})
export class ContactComponent {
  sent = false;
  model = { nombre: '', correo: '', asunto: '', mensaje: '' };

  submit(form: NgForm): void {
    this.sent = false;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.sent = true;
    form.resetForm();
  }
}
