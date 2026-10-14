import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NewsComponent } from './pages/news.component';
import { DetailComponent } from './pages/detail.component';
import { FavoritesComponent } from './pages/favorites.component';
import { ContactComponent } from './pages/contact.component';
import { AboutComponent } from './pages/about.component';
import { ManageComponent } from './pages/manage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Motor 360 | Inicio' },
  { path: 'noticias', component: NewsComponent, title: 'Motor 360 | Noticias' },
  { path: 'noticias/:id', component: DetailComponent, title: 'Motor 360 | Detalle' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Motor 360 | Favoritos' },
  { path: 'contacto', component: ContactComponent, title: 'Motor 360 | Contacto' },
  { path: 'acerca', component: AboutComponent, title: 'Motor 360 | Acerca de' },
  { path: 'gestion', component: ManageComponent, title: 'Motor 360 | Gestión' },
  { path: '**', redirectTo: '' }
];
