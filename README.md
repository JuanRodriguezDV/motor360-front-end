# Motor 360 - Entrega final Front End

Proyecto académico del módulo **Desarrollo de Front-end** del Politécnico Grancolombiano.

## Entrega final - Escenario 7 / Semana 7

La versión final incorpora una aplicación Angular dentro de `angular-app/` y conserva la versión HTML/CSS/JavaScript de la Entrega 2 como evidencia de la evolución del proyecto.

### Tecnologías
- Angular 19
- TypeScript
- HTML5 y CSS3
- JSON local
- localStorage
- Git y GitHub
- GitHub Actions / GitHub Pages

### Funcionalidades
- Home con noticias destacadas.
- Listado dinámico de noticias.
- Búsqueda y filtros por categoría.
- Vista de detalle con rutas Angular.
- Favoritos persistentes con localStorage.
- Formulario de contacto con validaciones.
- Mini CRUD local para crear y eliminar noticias.
- Diseño responsive.

### Fundamentos Angular evidenciados
- Componentes standalone.
- Angular Router.
- Interpolación.
- Property binding.
- Event binding.
- Two-way binding con `[(ngModel)]`.
- Servicio compartido para datos y persistencia.

## Repositorio
https://github.com/JuanRodriguezDV/motor360-front-end

## Despliegue
URL configurada para GitHub Pages:

https://juanrodriguezdv.github.io/motor360-front-end/

El flujo de despliegue está definido en `.github/workflows/deploy-angular-pages.yml`.

## Ejecución local de Angular
```bash
cd angular-app
npm install
npm start
```

## Compilación
```bash
cd angular-app
npm run build -- --base-href=/motor360-front-end/
```
