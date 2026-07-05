# Spec: Footer

## Qué hace

Pie de página con logo, links de navegación, redes sociales, links legales y copyright. Fondo `--acero-oscuro`.

## Criterios de aceptación

- [ ] Fondo `--acero-oscuro` (`#3A2218`)
- [ ] Fila superior (flex, `space-between`, `flex-wrap`):
  - **Logo:** foto circular 44px + nombre de marca + `@cl.dentalvalencia`
  - **Links de nav:** Nosotros, Servicios, Galería, Reseñas, Contacto, 957 660 565
  - **Social:** iconos Instagram y WhatsApp en círculos con borde sutil
- [ ] Separador entre fila superior y legal: `border-bottom: 1px solid rgba(255,255,255,0.08)`
- [ ] Links legales centrados: Aviso Legal · Política de Privacidad · Política de Cookies
- [ ] Copyright: `© 2025–2026 Clínica Dental Valencia · Dra. Carmen Valencia Fernández · Aguilar de la Frontera`
- [ ] En ≤600px: fila superior en columna alineada a la izquierda
- [ ] Hover de links: color `--arena`
- [ ] Links legales abren en la misma pestaña (son páginas del mismo dominio)
