# Spec: Navegación fija

## Qué hace

Barra de navegación fija en la parte superior. Transparente sobre el hero; cambia a fondo oscuro (`--acero-oscuro`) al hacer scroll. Contiene logo (foto circular + nombre), links de sección, y botón de WhatsApp.

## Criterios de aceptación

- [ ] Permanece fija al hacer scroll (`position: fixed`)
- [ ] Transparente al inicio; fondo `--acero-oscuro` y sombra a partir de 10px de scroll
- [ ] Logo: foto circular 64px con borde `--arena`, nombre en Playfair Display + "Aguilar de la Frontera" en mayúsculas
- [ ] Links: Nosotros, Servicios, Galería, Reseñas, Contacto — ocultos en ≤900px
- [ ] Botón teléfono/WhatsApp visible en desktop; oculto en ≤900px
- [ ] Burger menu visible en ≤900px; al hacer clic despliega links en columna sobre fondo `--acero-oscuro`
- [ ] Al hacer clic en cualquier link del menú móvil, el menú se cierra
- [ ] Transiciones: `background`, `box-shadow` en 350ms ease — nunca brusco
