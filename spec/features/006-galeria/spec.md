# Spec: Galería / Instagram

## Qué hace

Sección CTA para dirigir al perfil de Instagram de la clínica. Estado actual: solo muestra el enlace al perfil. Estado objetivo del backlog: mostrar un grid de fotos reales.

## Estado actual (implementado)

- Icono de Instagram con gradiente de marca
- Label "Instagram", H2 "Síguenos en Instagram"
- Subtítulo: "Descubre los tratamientos, el día a día de la clínica y los resultados reales."
- Botón: "Seguirnos en Instagram @cl.dentalvalencia" → `instagram.com/cl.dentalvalencia/`

## Criterios de aceptación (estado actual)

- [ ] Fondo `--arena-light`, centrado, máx `560px`
- [ ] Icono Instagram con gradiente `#f9ce34 → #ee2a7b → #6228d7`, `border-radius: 18px`
- [ ] Botón con fondo `--acero-oscuro`, color blanco, SVG de Instagram inline
- [ ] El handle `@cl.dentalvalencia` se muestra con opacidad reducida dentro del botón
- [ ] El enlace abre en `target="_blank"` con `rel="noopener"`

## Backlog: Grid de posts reales

- Mostrar 9 fotos de `assets/instagram/post_1-9.jpg` en grid 3×3
- Cada foto enlaza al perfil de Instagram
- Hover: `scale(1.04)` en 400ms
- Ver `roadmap.md` para priorización
