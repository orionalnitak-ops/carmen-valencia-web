# Spec: Servicios

## Qué hace

Grid de 6 tarjetas con los tratamientos dentales ofrecidos. Fondo `--arena-light`.

## Servicios (datos reales, no modificar)

1. **Odontología General** — Revisiones, limpiezas, empastes y tratamientos preventivos.
2. **Ortodoncia** — Brackets metálicos, estéticos y alineadores transparentes.
3. **Implantes Dentales** — Implantes de titanio que se integran de forma natural.
4. **Estética Dental** — Carillas de porcelana, blanqueamiento y diseño de sonrisa.
5. **Odontopediatría** — Atención especializada para niños en ambiente cálido.
6. **Urgencias Dentales** — Atención rápida ante cualquier emergencia dental.

## Criterios de aceptación

- [ ] Fondo sección: `--arena-light`
- [ ] Header centrado con label "Tratamientos", H2 y subtítulo
- [ ] Grid 3 columnas → 2 → 1 en breakpoints 900px y 600px
- [ ] Tarjetas: fondo blanco, borde `--arena-mid`, `border-radius: 10px`
- [ ] Punto verde (`--verde`, 10px) encima del título — sin iconos decorativos
- [ ] `::after` pseudo: borde inferior de 3px `--arena`, `scaleX(0)` → `scaleX(1)` en hover
- [ ] Hover: `translateY(-4px)`, sombra suave
- [ ] Entrada escalonada con IntersectionObserver: delays `0 / 80 / 160 / 240 / 320 / 400ms`
- [ ] No hay enlace individual por servicio — son tarjetas informativas
