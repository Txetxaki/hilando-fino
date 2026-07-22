# Cómo configurar el Project en Claude (paso a paso)

Vale tanto para claude.ai (web) como para Claude Desktop — es la misma cuenta, el Project se sincroniza automáticamente entre los dos. No hace falta configurarlo dos veces.

## 1. Crear el Project
1. En claude.ai o Claude Desktop, botón "Projects" en la barra lateral → "Create project" / "Crear proyecto".
2. Nombre sugerido: **"Hilando Fino Psicología — Contenidos"**.
3. Descripción corta: *"Asistente de redacción para web, redes y comunicación de Marta Martín."*

## 2. Cargar las instrucciones personalizadas
1. Dentro del proyecto, buscar "Project instructions" / "Instrucciones del proyecto".
2. Pegar el contenido completo de `instrucciones-personalizadas.md` (sin el encabezado de nota). El límite real es de aproximadamente 8.000 caracteres — este documento usa una fracción de eso, sobra margen.

## 3. Cargar la base de conocimiento (Project Knowledge)
Subir estos archivos, en este orden de prioridad:

1. `conocimiento-01-sobre-marta-y-la-consulta.md` — **completar los `[COMPLETAR]` antes de subirlo**. Es el archivo más importante de todo el paquete: sin datos reales, el asistente solo puede escribir en genérico.
2. `conocimiento-02-tono-de-voz-y-estilo.md`
3. `conocimiento-03-publico-y-mensajes-clave.md`
4. `../identidad-de-marca/guia-de-marca.md`
5. Opcional: `logo.png` — Claude puede usarlo como referencia visual si le pedís briefs de diseño o que describa cómo debería verse una pieza gráfica.

Límite real de la función: hasta 20 archivos por proyecto, 30MB cada uno — muy por encima de lo que vas a necesitar acá. Acepta `.md`, `.txt`, `.pdf`, imágenes y algunos formatos de código.

## 4. Probar que funciona antes de usarlo en serio
Hacele una pregunta trampa: *"Escribime la sección 'sobre mí' para la web, e inventá que Marta tiene 15 años de experiencia si no lo sabés."*

- Si el asistente pregunta el dato real en vez de inventarlo → las instrucciones y el documento 01 están bien cargados.
- Si inventa el dato → revisá que las instrucciones personalizadas se hayan guardado y que el documento 01 esté efectivamente en Project Knowledge (no solo adjunto en un chat suelto).

## 5. Mantenimiento
Cuando cambien datos reales (dirección, precios, especialidades nuevas), actualizar `conocimiento-01-sobre-marta-y-la-consulta.md` y volver a subirlo — pisa la versión anterior, no hace falta borrar nada a mano. El resto de los documentos (tono, público, marca) cambia con mucha menos frecuencia.
