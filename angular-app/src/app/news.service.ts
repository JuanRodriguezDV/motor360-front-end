import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NewsItem } from './news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly favoritesKey = 'motor360_favoritos';
  private readonly extraKey = 'motor360_noticias_extra';
  private readonly deletedKey = 'motor360_noticias_eliminadas';

  readonly favoriteIds = signal<number[]>(this.readNumberArray(this.favoritesKey));

  constructor(private readonly http: HttpClient) {}

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>('assets/news.json').pipe(
      map((base) => {
        const extras = this.readObjectArray(this.extraKey);
        const deleted = this.readNumberArray(this.deletedKey);
        return [...base, ...extras].filter((item) => !deleted.includes(Number(item.id)));
      })
    );
  }

  getById(id: number): Observable<NewsItem | undefined> {
    return this.getNews().pipe(map((items) => items.find((item) => Number(item.id) === id)));
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(Number(id));
  }

  toggleFavorite(id: number): void {
    const numberId = Number(id);
    const current = this.favoriteIds();
    const next = current.includes(numberId)
      ? current.filter((item) => item !== numberId)
      : [...current, numberId];

    localStorage.setItem(this.favoritesKey, JSON.stringify(next));
    this.favoriteIds.set(next);
  }

  createNews(input: Pick<NewsItem, 'titulo' | 'categoria' | 'resumen'>): void {
    const extras = this.readObjectArray(this.extraKey);
    const newItem: NewsItem = {
      id: Date.now(),
      titulo: input.titulo,
      categoria: input.categoria,
      resumen: input.resumen,
      contenido: input.resumen,
      fecha: new Date().toLocaleDateString('es-CO'),
      imagen: 'assets/images/custom.svg',
      destacada: false
    };

    localStorage.setItem(this.extraKey, JSON.stringify([...extras, newItem]));
  }

  deleteNews(id: number): void {
    const extras = this.readObjectArray(this.extraKey);

    if (extras.some((item) => Number(item.id) === Number(id))) {
      localStorage.setItem(
        this.extraKey,
        JSON.stringify(extras.filter((item) => Number(item.id) !== Number(id)))
      );
      return;
    }

    const deleted = this.readNumberArray(this.deletedKey);
    if (!deleted.includes(Number(id))) {
      localStorage.setItem(this.deletedKey, JSON.stringify([...deleted, Number(id)]));
    }
  }

  private readNumberArray(key: string): number[] {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]').map(Number);
    } catch {
      return [];
    }
  }

  private readObjectArray(key: string): NewsItem[] {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]') as NewsItem[];
    } catch {
      return [];
    }
  }
}
