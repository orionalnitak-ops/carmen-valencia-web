# Spec: CTA Strip

## Qué hace

Banda horizontal de llamada a la acción entre la sección Nosotros y Servicios. Fondo de color `--acero`, texto + botón de contacto.

## Contenido

- **H2:** "¿Lista para tu nueva sonrisa?"
- **Subtítulo:** "Llámanos hoy y reserva tu cita. Te atendemos con toda la dedicación que mereces."
- **Botón:** "WhatsApp · 957 660 565" → `wa.me/34957660565`

## Criterios de aceptación

- [ ] Fondo `--acero` (`#8B5E52`), padding `56px 5%`
- [ ] Layout flex `space-between` en desktop; columna centrada en ≤900px
- [ ] Botón con fondo `--arena-light`, color `--acero-oscuro`, pill shape
- [ ] Hover del botón: fondo `--blanco`, `translateY(-2px)`
- [ ] Nunca usar `--acero-oscuro` como fondo de sección — solo `--acero`
