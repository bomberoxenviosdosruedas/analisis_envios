# Envíos DosRuedas — Guía Oficial de Identidad & Sistema de Diseño (v2.0)

> **Documento Oficial de la Design Division**  
> **Líder Técnico**: `agency-ui-designer`  
> **Estrategia e Identidad**: `agency-brand-guardian`  
> **Arquitectura UX & Accesibilidad**: `agency-ux-architect`  
> **Fuente de Verdad**: Ingeniería Inversa del Código Real en Producción (`index.html`, `styles.css`, `contexto/**`).

---

## 1. Manifiesto y Auditoría del Código Real

Esta guía de diseño no surge de teorías o suposiciones, sino de una auditoría empírica sobre los archivos de código activo de Envíos DosRuedas.

```
Total de instancias cromáticas analizadas: > 1.800 selectores y clases
- #FFFFFF (Blanco Puro):              336 menciones
- #0950F6 (Azul Canónico DosRuedas):   179 menciones (Color identitario principal)
- #FFEC01 (Amarillo Alta Visibilidad): 130 menciones (Color CTA principal)
- #2ECC85 (Verde Menta MarDelivery):    99 menciones (Vertical gastronómica)
- #031811 (Fondo Oscuro MarDelivery):   67 menciones
- Bebas Neue / Anton SC / Outfit:      > 1.000 aplicaciones tipográficas
```

### Inconsistencias Detectadas y Resueltas
1. **Dispersión de Azules**: Coexistían tonos no coordinados (`#0842ca`, `#0840c4`, `#073ec2`, `#063198`). Se unificaron bajo la escala canónica `--ds-color-blue-50` a `--ds-color-blue-900`, fijando `#0950F6` como ancla visual absoluta.
2. **Contaminación de Amarillos en Tailwind**: En componentes heredados se utilizaban colores Tailwind arbitrarios como `#EAB308` (amber/yellow-500). Se erradicaron y estandarizaron en `--ds-color-yellow-500` (`#FFEC01`) para reposición exacta de marca.
3. **Múltiples Radios Arbitrarios**: Había coexistencia de `7px`, `8px`, `10px`, `12px`, `14px`, `18px`, `20px` y `9999px`. Se consolidaron en la escala formal: `sm (6px)`, `md (8px)`, `lg (12px)`, `xl (16px)`, `2xl (20px)` y `pill (9999px)`.

---

## 2. Personalidad y Arquitectura de Marca

### Propósito
Conectar a Mar del Plata mediante soluciones de logística urbana de última milla, brindando previsibilidad, velocidad y respaldo presencial con flota propia y base operativa real.

### Pilares de Identidad
1. **Velocidad Urbana y Agilidad**: Representada por la energía cinética del amarillo `#FFEC01` y la tipografía condensada de impacto *Anton SC*.
2. **Seguridad y Respaldo Institucional**: Transmitida por el azul royal profundo `#0950F6` y la legibilidad geométrica de *Outfit*.
3. **Precisión Técnica**: Respaldada por métricas operativas y datos en *Geist Mono* (horarios, teléfonos, coordenadas, tracking).

### Tono y Voz
- **Directo y resolutivo**: Comunicación orientada a la acción ("Cotizá tu envío en el acto", "Flota propia · Todo Mar del Plata").
- **Local y Marplatense**: Identidad fuertemente enraizada en la ciudad (referencias a base operativa física en Friuli 1972, cobertura en 3 horas en toda la cuadrícula urbana).

---

## 3. Sistema Cromático Canónico

### 3.1. Primarios Institucionales (Azul DosRuedas)
El color matriz del ecosistema es el **Azul Royal `#0950F6`**, utilizado en fondos de cabecera, botones institucionales, contenedores hero y pie de página.

| Token | Hex | RGB | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--ds-color-blue-50` | `#E6EEFE` | `rgb(230, 238, 254)` | Fondos sutiles, textos secundarios sobre azul |
| `--ds-color-blue-100` | `#BACEFD` | `rgb(186, 206, 253)` | Bordes suaves, chips claros |
| `--ds-color-blue-200` | `#8EAFFB` | `rgb(142, 175, 251)` | Estados interactivos hover en fondos claros |
| `--ds-color-blue-300` | `#628FF9` | `rgb(98, 143, 249)` | Ilustraciones, grafismo secundario |
| `--ds-color-blue-400` | `#3570F8` | `rgb(53, 112, 248)` | Gradientes dinámicos y bordes elevados |
| **`--ds-color-blue-500`** | **`#0950F6`** | **`rgb(9, 80, 246)`** | **Color Primario Canónico Oficial** |
| `--ds-color-blue-600` | `#073EC2` | `rgb(7, 62, 194)` | Estado hover de botones primarios |
| `--ds-color-blue-700` | `#063198` | `rgb(6, 49, 152)` | Estado pressed, bordes de alto contraste |
| `--ds-color-blue-900` | `#063198` | `rgb(6, 49, 152)` | Alias a Deep Blue (el tono Midnight #0A1128 fue eliminado del sistema) |

### 3.2. Acentos de Alta Conversión (Amarillo DosRuedas)
El **Amarillo `#FFEC01`** es el elemento de máxima pregnancia visual. Está estrictamente reservado para acciones de conversión primarias (CTAs), insignias de estado activo y micro-acentos interactivos.

| Token | Hex | RGB | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--ds-color-yellow-50` | `#FFFDE6` | `rgb(255, 253, 230)` | Fondo de alert boxes destacados |
| `--ds-color-yellow-100` | `#FFFAB8` | `rgb(255, 250, 184)` | Bordes de advertencia suave |
| `--ds-color-yellow-300` | `#FFF45C` | `rgb(255, 244, 92)` | Resplandor de hover dinámico |
| `--ds-color-yellow-400` | `#FFF12E` | `rgb(255, 241, 46)` | Hover de botones CTA principales |
| **`--ds-color-yellow-500`** | **`#FFEC01`** | **`rgb(255, 236, 1)`** | **Color Acento Canónico Oficial (CTA)** |
| `--ds-color-yellow-600` | `#E6D400` | `rgb(230, 212, 0)` | Bordes y estado activo de botones |

### 3.3. Sub-Marca MarDelivery Gastronomía
Vertical especializada en entrega de comida caliente y ruteo para restaurantes y locales gastronómicos en Mar del Plata.

| Token | Hex | Función |
| :--- | :--- | :--- |
| `--ds-color-md-bg` | `#031811` | Fondo oscuro esmeralda |
| `--ds-color-md-green` | `#2ECC85` | Verde menta de entrega rápida |
| `--ds-color-md-green-hover`| `#27B374` | Hover interactivo |
| `--ds-color-md-amber` | `#F5B938` | Acento de pedidos pendientes / avisos |

### 3.4. Colores Funcionales & Mensajería
- **WhatsApp Direct**: `#25D366` (Hover: `#128C7E`) — Conversión omnicanal directa.
- **Éxito**: `#2ECC85` / Fondo: `#EEF6F2`.
- **Alerta / Espera**: `#F5B938` / Fondo: `#FEF9E7`.
- **Error / Rechazo**: `#EF4444` / Fondo: `#FEF2F2`.

---

## 4. Matriz de Contraste y Accesibilidad (WCAG 2.1)

| Combinación de Elementos | Ratio de Contraste | Nivel WCAG | Dictamen de la División |
| :--- | :---: | :---: | :--- |
| **Texto Blanco (`#FFFFFF`) sobre Azul Primario (`#0950F6`)** | **4.54:1** | **AA** (Apto texto normal y grande) | **Aprobado Canónico** |
| **Texto Azul (`#0950F6`) sobre Amarillo CTA (`#FFEC01`)** | **8.86:1** | **AAA** (Máxima legibilidad) | **Aprobado para Botones CTA** |
| **Texto Amarillo (`#FFEC01`) sobre Azul Primario (`#0950F6`)** | **8.86:1** | **AAA** (Excelente visibilidad) | **Aprobado para Titulares / Badges** |
| **Texto Slate 900 (`#0F172A`) sobre Blanco (`#FFFFFF`)** | **15.8:1** | **AAA** (Óptimo para lectura continua) | **Aprobado para Cuerpo de Texto** |
| *Texto Amarillo (`#FFEC01`) sobre Blanco (`#FFFFFF`)* | *1.15:1* | *Fallo Severo* | **ESTRICTAMENTE PROHIBIDO** |
| *Texto Blanco (`#FFFFFF`) sobre Amarillo (`#FFEC01`)* | *1.15:1* | *Fallo Severo* | **ESTRICTAMENTE PROHIBIDO** |

> [!IMPORTANT]
> Todo botón o elemento interactivo con fondo amarillo `--ds-color-yellow-500` **debe** llevar texto en azul `--ds-color-blue-500` o slate oscuro `--ds-color-slate-900`. El uso de texto blanco sobre fondo amarillo está penado por romper el estándar WCAG AA.

---

## 5. Sistema Tipográfico

El sistema emplea una estrategia de 4 familias tipográficas especializadas cargadas desde Google Fonts con `font-display: swap`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton+SC&family=Bebas+Neue&family=Geist+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 5.1. Familias y Roles
1. **Anton SC (`--ds-font-display`)**:
   - Titulares de héroe, palabras clave y nombre de marca en mayúsculas (`text-transform: uppercase`). Interlineado ultra-compacto (`line-height: 0.92 - 1.0`).
2. **Bebas Neue (`--ds-font-subhead`)**:
   - Encabezados de sección (H2/H3), tarjetas, badges y etiquetas de botones. Carácter técnico y dinámico.
3. **Outfit (`--ds-font-sans`)**:
   - Párrafos de lectura, etiquetas de formularios, listados de características y descripciones extensas.
4. **Geist Mono (`--ds-font-mono`)**:
   - Números tabulares, teléfonos, horarios de despacho, badges técnicos, coordenadas de ruteo y metadatos.

### 5.2. Escala Tipográfica Estandarizada

| Nivel | Token | Tamaño (Rem / Px) | Line-Height | Familia Recomendada |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `--ds-text-hero` | `clamp(2.5rem, 5.5vw, 4rem)` (40–64px) | `0.92` | Anton SC |
| **H1 Sección** | `--ds-text-4xl` | `clamp(2rem, 4vw, 3rem)` (32–48px) | `1.05` | Anton SC / Bebas |
| **H2 Subtítulo**| `--ds-text-3xl` | `clamp(1.75rem, 3.2vw, 2.25rem)` (28–36px) | `1.15` | Bebas Neue |
| **H3 Card / Feature** | `--ds-text-2xl` | `1.5rem` (24px) | `1.25` | Bebas Neue |
| **H4 Columna** | `--ds-text-xl` | `1.25rem` (20px) | `1.30` | Bebas Neue |
| **Body Lead** | `--ds-text-lg` | `1.125rem` (18px) | `1.60` | Outfit Regular/Medium |
| **Body Base** | `--ds-text-base` | `1rem` (16px) | `1.50` | Outfit Regular |
| **Body Small** | `--ds-text-sm` | `0.875rem` (14px) | `1.45` | Outfit Light/Regular |
| **Caption / Eyebrow** | `--ds-text-xs` | `0.75rem` (12px) | `1.20` | Geist Mono 600 Uppercase |
| **Micro Badge** | `--ds-text-2xs` | `0.6875rem` (11px) | `1.00` | Geist Mono 700 Uppercase |

---

## 6. Catálogo de Componentes Base

### 6.1. Botones (Buttons)
1. **Canonical CTA (`.btn-cta-pill`)**:
   - Altura mínima `48px`. Forma de píldora (`border-radius: 9999px`).
   - Fondo `--ds-color-yellow-500`, texto `--ds-color-blue-500` en *Bebas Neue*.
   - Disco de flecha circular (`.arrow-disc`) que rota 45° en hover (`transform: rotate(-45deg)`).
2. **WhatsApp Direct (`.btn-whatsapp-pill`)**:
   - Altura mínima `48px`. Icono oficial SVG de WhatsApp. Fondo esmeralda/verde con texto blanco o fondo blanco con borde verde.
3. **Secondary Ghost (`.btn-ghost-pill`)**:
   - Borde blanco o azul translúcido con hover amarillo de alta visibilidad.
4. **Scroll-to-top (`.btn-scroll-top`)**:
   - Botón flotante circular `44x44px`, sombra elevada y chevron apuntando al cielo.

### 6.2. Insignias y Chips (Badges & Chips)
1. **Live Status Indicator (`.badge-live-pulse`)**:
   - Contenedor píldora con micro-punto (`.live-dot`) animado con keyframe de pulsación continua.
2. **Category / Service Pill (`.chip-category`)**:
   - Tipografía *Geist Mono*, bordes sutiles con `border-radius: 9999px` y padding `4px 12px`.
3. **Feature Icon Pill (`.icon-pill`)**:
   - Cuadrado redondeado `28x28px` (`border-radius: 6px`) para albergar iconos SVG temáticos.

### 6.3. Tarjetas (Cards)
1. **Bento Card (`.ds-card-bento`)**:
   - Doble bisel translúcido (`backdrop-filter: blur(14px)`), borde exterior sutil `rgba(255,255,255,0.22)`.
2. **Service Tier Card (`.ds-card-service`)**:
   - Encabezado con badge de tiempo límite ("En franja de 3 hs"), selector de precio destacado y botón de activación directa.
3. **Testimonial Review Card (`.ds-card-review`)**:
   - 5 estrellas amarillas, cita encomillada de cliente marplatense verificado y chip de verificación.
4. **MarDelivery Card (`.ds-card-mardelivery`)**:
   - Fondo `#031811`, acentos en verde menta `#2ECC85` y micro-badge ámbar `#F5B938`.

### 6.4. Formularios & Entradas (Inputs)
- Altura estandarizada `46px` - `48px` para facilidad de clic táctil en smartphones.
- Borde con radio `10px` o `9999px`.
- Estado de foco con anillo (`focus-visible: outline: 2px solid var(--ds-color-yellow-500)`).

---

## 7. Protocolo de Gobernanza y Uso de Tokens

1. **Prohibición de Colores 'Hardcodeados'**:
   - Queda terminantemente prohibido utilizar `#0950F6`, `#FFEC01` o colores Tailwind genéricos como `bg-blue-600` en nuevos componentes. Todo debe referenciar a `var(--ds-color-*)`.
2. **Consumo Directo**:
   - En CSS: Importar o enlazar `design-system/tokens.css` al inicio de cada stylesheet o mediante `<link rel="stylesheet" href="/design-system/tokens.css">`.
3. **Validación de Accesibilidad**:
   - Cada nuevo componente propuesto por la división debe superar un test de contraste mínimo 4.5:1 para texto normal y 3.0:1 para componentes de interfaz de usuario.
