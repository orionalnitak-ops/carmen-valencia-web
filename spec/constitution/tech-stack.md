# Tech Stack

## Decisiones y razonamiento

### HTML5 estático — sin frameworks
**Decisión:** Un solo `index.html` con CSS y JS inline.
**Por qué:** La web es un escaparate informativo sin lógica de servidor. Sin framework = sin dependencias que mantener, sin build que romper, sin actualizaciones de seguridad. Una clínica dental no necesita React.

### CSS custom properties + Grid/Flexbox
**Decisión:** CSS nativo, variables en `:root`, layouts con Grid y Flexbox.
**Por qué:** Sin preprocesadores ni utilidades = un archivo más simple, editable directamente sin build step. Las variables CSS (`--verde`, `--arena`, etc.) centralizan el sistema de colores.

### Vanilla JS inline (~60 líneas)
**Decisión:** JS en `<script>` al final del HTML.
**Por qué:** Cubre exactamente lo que se necesita: scroll del nav, menú burger, IntersectionObserver para reveals animados, contador de stats. No justifica un bundler.

### Fuentes locales (woff2)
**Decisión:** Inter y Playfair Display en `assets/fonts/`, cargadas via `assets/fonts.css`.
**Por qué:** Fuentes de Google Fonts implican una petición a servidores de Google, lo que requiere mención explícita en la política de privacidad bajo el RGPD. Con fuentes locales, cero peticiones a terceros en la carga de la página.

### OpenStreetMap (sin API key)
**Decisión:** Mapa embed de OpenStreetMap en la sección Contacto.
**Por qué:** Google Maps requiere API key (coste) y tratamiento de datos (RGPD). OpenStreetMap es open source, sin API key, sin cookies propias de terceros.

### Schema.org + Open Graph
**Decisión:** JSON-LD con tipo `Dentist` en el `<head>` del HTML.
**Por qué:** Mejora la aparición en resultados de búsqueda locales de Google (rich snippets). Open Graph para previews en WhatsApp y redes sociales.

## Variables CSS de referencia rápida

```css
--blanco:       #FFFFFF   /* fondo principal */
--arena:        #C9A87C   /* acento cálido, botones secundarios */
--arena-light:  #F5EDE0   /* fondos servicios, nosotros hover */
--arena-mid:    #E8D5B5   /* bordes de tarjetas */
--verde:        #85C226   /* puntos de servicio, acentos menores */
--acero:        #8B5E52   /* label eyebrows, CTA strip */
--acero-dark:   #5C3A30   /* hover de botones acero */
--acero-oscuro: #3A2218   /* nav scrolled, footer, botones primarios */
--texto:        #2A1E18   /* texto principal */
--texto-mid:    #7A6A62   /* texto secundario, descriptions */
--gris-light:   #F4F3F0   /* fondo sección reseñas */
```

## Restricciones activas

- No introducir ninguna librería JS de terceros en `index.html`
- No cargar assets desde CDN (todo local)
- No usar Google Analytics ni píxeles de tracking (política de privacidad minimalista)
- No usar `backdrop-filter` fuera del nav (rendimiento en móviles)
- No usar `height: 100vh` — siempre `min-height: 100dvh`
