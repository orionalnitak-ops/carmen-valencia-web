# Spec: Hero

## Qué hace

Sección de entrada a pantalla completa con foto de Aguilar de la Frontera como fondo. Comunica el nombre de la clínica, el claim principal y los botones de acción.

## Contenido

- **Eyebrow:** "Clínica Dental Valencia · Aguilar de la Frontera · Córdoba"
- **H1:** "La sonrisa que mereces, en *Aguilar de la Frontera*"
- **Subtítulo:** "La Dra. Carmen Valencia Fernández y su equipo te cuidan con la más avanzada tecnología y un trato cercano y humano."
- **CTA primario:** Botón WhatsApp (`wa.me/34957660565`)
- **CTA secundario:** enlace "Reserva una cita hoy" (mismo destino)

## Criterios de aceptación

- [ ] Imagen de fondo: `assets/aguilar-hero.jpg`, `background-position: center 42%`
- [ ] Animación Ken Burns: `scale(1) → scale(1.03)` en 30s loop, sutil y no mareante
- [ ] Overlay de degradado oscuro sobre la foto para asegurar legibilidad del texto
- [ ] Efecto sunset glow: gradiente radial naranja/rojo en zona superior derecha, animado en 22s loop
- [ ] Sección sobre el hero (Nosotros) emerge con `border-radius: 48px 48px 0 0` y `margin-top: -48px`
- [ ] Altura mínima `92vh`, nunca `100vh`
- [ ] Texto centrado, máximo `780px` de ancho
- [ ] H1 entra con fade + translateY al cargar la página (JS, no CSS animation)
- [ ] En ≤900px: padding reducido, texto escala al mínimo del `clamp()`
