# Spec: Nosotros

## Qué hace

Sección sobre la clínica y la doctora. Grid de dos columnas: foto de la Dra. Carmen a la izquierda, texto + características a la derecha.

## Contenido

- **Label:** "Nuestra clínica"
- **H2:** "Tu dentista de confianza en Aguilar de la Frontera"
- **Párrafo 1:** Dra. Carmen Valencia Fernández, +15 años de experiencia, odontología general, ortodoncia e implantología.
- **Párrafo 2:** Renovación 2025 con diseño de @esbozo.interiorismo.
- **3 características:** Tecnología última generación · Atención personalizada · Nº colegiado 14/00/1954
- **CTA:** Botón "Pedir cita" → WhatsApp

## Criterios de aceptación

- [ ] Grid `5fr 6fr`; columna derecha con `border-left: 1px solid --arena-mid`
- [ ] Foto: `assets/dra-carmen.jpg`, `aspect-ratio: 4/5`, `max-height: 560px`, `border-radius: 12px`
- [ ] Fondo: `--blanco` (sección emerge sobre el hero con esquinas redondeadas)
- [ ] Íconos de características: cuadrado 32px con fondo `--arena-light`, SVG checkmark
- [ ] Columna de texto tiene reveal con `IntersectionObserver` (`.reveal` class)
- [ ] En ≤900px: una sola columna, foto arriba del texto; `border-left` → `border-top`
