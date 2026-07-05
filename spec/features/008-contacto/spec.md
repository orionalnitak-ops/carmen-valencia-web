# Spec: Contacto

## Qué hace

Sección de contacto con datos reales de la clínica y mapa de OpenStreetMap. Grid de dos columnas: información a la izquierda, mapa a la derecha.

## Datos de contacto (reales, no modificar sin confirmar)

- **Dirección:** Calle Llano de las Coronadas 24, Aguilar de la Frontera, Córdoba 14920
- **Teléfono / WhatsApp:** 957 660 565 → `wa.me/34957660565`
- **Móvil:** 638 867 962 → `tel:638867962`
- **Coordenadas:** lat 37.5177, lon -4.6564

## Criterios de aceptación

- [ ] Fondo `--acero-dark` (`#5C3A30`), texto claro
- [ ] Label en `--arena`, H2 y párrafo de intro en blanco/semitransparente
- [ ] Grid `1fr 1fr`, gap 64px; en ≤900px: una columna
- [ ] 3 items de contacto: Dirección, Teléfonos, Horario — cada uno con icono SVG en caja 42px
- [ ] Tabla de horario con fondo transparente, `border-bottom` sutil entre filas
- [ ] Botón WhatsApp: glassmorphism (fondo semitransparente + `backdrop-filter: blur(8px)`)
- [ ] Mapa: iframe de OpenStreetMap, `height: 400px` desktop / `280px` móvil, `border-radius: 14px`
- [ ] Mapa usa `loading="lazy"` para no bloquear la carga inicial
- [ ] El enlace de WhatsApp incluye mensaje preescrito: "Hola, me gustaría pedir cita"
