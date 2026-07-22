# Guía de identidad de marca — Marta Martín · Hilando Fino Psicología

## 1. Esencia de marca

"Hilando fino" es hilar con cuidado: prestar atención a cada detalle de un ovillo que a primera vista parece un nudo imposible. Es exactamente lo que ofrece Marta — un espacio donde los pensamientos enredados se desenredan hilo a hilo, con precisión y sin prisa.

El logo ya lo dice todo: un cerebro construido con hilo enredado, dibujado a mano. No es el cerebro clínico de un manual — es un cerebro humano, real, con nudos que se pueden deshacer.

Eje de todo lo que sale de la marca: **cercanía profesional**. Ni frialdad clínica, ni informalidad de coach de Instagram.

## 2. Paleta de colores (extraída directamente del logo)

| Color | Hex | RGB | Uso |
|---|---|---|---|
| Ciruela (primario) | `#5A434C` | 90, 67, 76 | Texto, "Marta Martín", ilustración del cerebro, máxima jerarquía |
| Terracota (secundario) | `#D1807E` | 209, 128, 126 | Acentos, "hilandofino", iconos, bordes, fondos de tarjetas |
| Ciruela oscuro | `#3E2E35` | 62, 46, 53 | Texto enfatizado, estados hover |
| Ciruela claro | `#EEECED` | 238, 236, 237 | Fondos sutiles, líneas divisorias |
| Terracota claro | `#F8EBEB` | 248, 235, 235 | Fondos de sección, tags, badges |
| Blanco cálido | `#FBF8F7` | 251, 248, 247 | Fondo base (blanco puro compite con el ciruela) |

**Nota de accesibilidad (verificada, no estimada):**
- Ciruela sobre blanco → contraste **8.97:1** → cumple WCAG AAA para texto de cualquier tamaño. Es el color seguro para texto de cuerpo.
- Terracota sobre blanco → contraste **2.96:1** → **no cumple WCAG AA** (mínimo 4.5:1 texto normal, 3:1 texto grande). No uses terracota como color de texto de párrafo sobre fondo claro. Resérvalo para elementos decorativos, iconos, fondos de bloque (con texto ciruela u oscuro encima), o texto muy grande donde el contraste importe menos.

**Regla de reparto:** 70% neutros/blanco, 20% ciruela, 10% terracota. La marca respira — no es un collage de color, es espacio en blanco con dos acentos bien puestos.

## 3. Tipografía

El logo usa lettering manuscrito para "Marta Martín". Eso se queda **exclusivamente en el logo** — es ilegible en pantalla a tamaños pequeños y no sirve como jerarquía de contenido real.

- **Titulares (H1–H3):** [Fraunces](https://fonts.google.com/specimen/Fraunces) — serif cálida, carácter editorial, gratuita (Google Fonts). Peso 500–600.
- **Cuerpo de texto / UI:** [Work Sans](https://fonts.google.com/specimen/Work+Sans) — sans-serif humanista, muy legible en pantalla, gratuita (Google Fonts). Peso 400–500.
- **Acento ocasional** (una cita o frase destacada por página, nunca párrafos ni botones): [Caveat](https://fonts.google.com/specimen/Caveat) — evoca el trazo a mano del logo sin sacrificar legibilidad del resto del sitio.

## 4. Uso del logo

- **Espacio de seguridad:** margen mínimo alrededor del logo equivalente a la altura de la "M" de "Marta".
- **Tamaño mínimo legible:** 120px de ancho en pantalla / 3cm en impreso. Por debajo de eso, el hilo enredado del cerebro pierde definición y se ve como una mancha.
- **Fondos:** diseñado para fondo claro. Sobre fondos oscuros o de color, se necesita una versión monocromática blanca (pendiente de generar) — nunca estirar, rotar ni recolorear el trazo original.
- El isotipo (el cerebro solo, sin el nombre) no debería usarse suelto en piezas donde la marca todavía no es reconocible (ej. primera visita a la web). Sí funciona suelto como favicon o watermark una vez que la marca ya esté instalada en la cabeza de quien la ve.

## 5. Tono de voz — resumen

Cercano, profesional, sin jerga clínica innecesaria, en segunda persona (tú), frases cortas, sin promesas de resultados milagrosos.

Desarrollo completo, con ejemplos "así sí / así no", en `claude-project/conocimiento-02-tono-de-voz-y-estilo.md`.
