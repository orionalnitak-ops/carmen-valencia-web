# Clínica Dental Valencia — Web

Web estática de la Clínica Dental Valencia, Dra. Carmen Valencia Fernández, Aguilar de la Frontera (Córdoba).

## Stack

- **Lenguaje:** HTML5 + CSS3 + Vanilla JS — sin frameworks, sin bundler, sin dependencias de producción
- **Tipografías:** Inter + Playfair Display — archivos woff2 locales en `assets/fonts/`
- **Mapa:** OpenStreetMap embed (sin Google Maps, sin API key)
- **Dominio:** dentalvalenciafernandez.es
- **Despliegue:** archivo estático directo — sin servidor, sin build step

## Comandos

- Abrir `index.html` en el navegador — no hay servidor de desarrollo
- `start index.html` (Windows) / `open index.html` (macOS) para preview rápido

## Estructura

```
.
├── index.html              ← página principal (HTML + CSS + JS en un único archivo)
├── aviso-legal.html        ← aviso legal LSSI-CE
├── privacidad.html         ← política de privacidad RGPD+LOPDGDD
├── cookies.html            ← política de cookies
├── sitemap.xml             ← sitemap SEO
├── robots.txt              ← directivas para crawlers
├── assets/
│   ├── fonts.css           ← importaciones de fuentes locales
│   ├── fonts/              ← archivos woff2 (Inter, Playfair Display)
│   ├── instagram/          ← fotos del perfil (profile.jpg + post_1-9.jpg)
│   ├── dra-carmen.jpg      ← retrato Dra. Carmen
│   └── aguilar-hero.jpg    ← foto hero de Aguilar de la Frontera
├── spec/                   ← especificaciones SDD del proyecto
└── DESIGN.md               ← sistema de diseño completo
```

## Convenciones

- Variables CSS en `:root` para todos los colores y medidas reutilizables
- Clases en kebab-case descriptivo (`service-card`, `hero-h1`, `nav-links`)
- Imágenes: solo rutas locales `assets/` — nunca URLs externas (Unsplash, Picsum, etc.)
- Iconos: SVG inline — nunca emoji, nunca fuentes de iconos externas
- Animaciones: solo `transform` y `opacity` — nunca `top`, `left`, `width`, `height`
- Responsive: `clamp()` para tipografía, CSS Grid para layouts

## No hagas

- No instalar dependencias npm para el proyecto web (package.json es solo para scripts auxiliares)
- No reemplazar OpenStreetMap con Google Maps (requeriría API key y RGPD adicional)
- No cargar fuentes desde Google Fonts (están en local para cumplir RGPD)
- No modificar `aviso-legal.html`, `privacidad.html` ni `cookies.html` salvo que se pida explícitamente
- No inventar datos del negocio — teléfono, dirección, horarios y reseñas son datos reales del cliente
- No usar librerías de animación externas (GSAP, AOS, Framer Motion están prohibidas)
- No usar `height: 100vh` — usar `min-height: 100dvh` (compatibilidad iOS Safari)
- No usar `backdrop-filter` salvo en el nav (rendimiento en móviles)

## Flujo de trabajo

- Antes de una tarea no trivial, propón un plan y espera confirmación
- Una tarea a la vez; al terminar, informa qué cambiaste para que lo revise
- Si no estás seguro al 80%, pregunta — nunca inventes información de la clínica

## Documentación

- Sistema de diseño completo (colores, tipografía, componentes, antipatrones): `DESIGN.md`
- Especificaciones por sección: `spec/features/`
- Constitución del proyecto: `spec/constitution/`
