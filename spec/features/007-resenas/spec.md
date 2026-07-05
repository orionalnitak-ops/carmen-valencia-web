# Spec: Reseñas Google

## Qué hace

Sección con la puntuación global de Google (4,4 ★) y un carrusel infinito con las reseñas reales de pacientes. Fondo `--gris-light`.

## Reseñas reales (no modificar sin confirmar con cliente)

| Nombre | Estrellas | Texto resumido |
|---|---|---|
| Fátima Moreno Aguilar | ★★★★★ | "Carmen es mi dentista de hace tanto... Si queréis perder el miedo al dentista, probad con ellos." |
| Francisco Lucena | ★★★★★ | "Excelentes profesionales. No cambio." |
| Juan A. Pérez Gama | ★★★★★ | "Toda mi familia nos dejamos cuidar por Dental Valencia." |
| Josecar CR | ★★★★★ | "Muy contento con mi sonrisa." |
| Ara Nieto Quintero | ★★★★★ | "¡Muy, muy buena atención y maravilloso trabajo!" |
| Maria Luisa Cordoba Garcia | ★★★★★ | "Grandes profesionales y un trato exquisito." |
| Rocio Exposito | ★★★★★ | "Carmen como dentista, la mejor, y su equipo inmejorable." |

## Criterios de aceptación

- [ ] Puntuación global: "4,4" en Playfair Display + estrellas + "9 reseñas en Google" + logo Google
- [ ] Botón "¿Fuiste paciente? Tu opinión nos hace mejores" → enlace a Google Maps (deja reseña)
- [ ] Carrusel: scroll horizontal automático (`animation: carousel-scroll 32s linear infinite`)
- [ ] Cards duplicadas para el loop infinito (2 sets de 7 = 14 cards en el DOM)
- [ ] El carrusel se pausa al hacer hover (`animation-play-state: paused`)
- [ ] Fade lateral con `mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)`
- [ ] Cards: 320px de ancho fijo, `border-radius: 14px`, sombra suave
- [ ] Avatar: inicial del nombre en círculo con fondo `--arena-light`
- [ ] CTA final: "Ver todas las reseñas en Google →"
