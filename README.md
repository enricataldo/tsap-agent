# TSAP Agent

**La IA entiende la pregunta. TSAP encuentra a la persona.**

TSAP es un agente híbrido que conecta preguntas de estudiantes con profesionales reales. Con internet, usa IA para comprender la intención, comparar perfiles y seleccionar la experiencia más relevante. Si la conexión falla, continúa con un enrutador local por palabras clave.

## Problema

Los estudiantes pueden encontrar teoría en buscadores, libros o chatbots, pero muchas preguntas prácticas necesitan experiencia real: cómo dimensionar un equipo para solicitar un presupuesto, qué controles requiere un depósito farmacéutico o cómo se aplican las operaciones unitarias en una industria específica.

## Solución

1. El estudiante escribe una pregunta concreta.
2. TSAP analiza la intención y el contexto.
3. El agente compara la consulta con una red curada de profesionales.
4. Recomienda el perfil más adecuado y explica el motivo.
5. Prepara la derivación para continuar por WhatsApp.

TSAP no reemplaza al profesional ni responde por él: reduce la fricción para encontrar a la persona indicada.

## Arquitectura

- Interfaz web responsive en HTML, CSS y JavaScript.
- OpenAI Responses API con salida estructurada para el enrutamiento en línea.
- Respaldo local explicable para funcionar sin conexión.
- Clave de API protegida como variable del servidor.
- Derivación contextual mediante WhatsApp.

## Ejecución

```bash
npm test
npm run build
```

Para la versión completamente offline, abrir `source/index.html` directamente en Chrome, Edge o Firefox.

## Configuración en línea

El servidor requiere `OPENAI_API_KEY`. Opcionalmente, `OPENAI_MODEL` permite cambiar el modelo; por defecto se usa `gpt-5-mini`. Nunca publiques una clave dentro del repositorio ni del HTML.

## Alcance del hackathon

El MVP demuestra la comprensión, selección y derivación. Una siguiente etapa incorporará perfiles administrables, consentimiento de los participantes, historial de consultas y automatización bidireccional con WhatsApp.

## Autor

Enrique Cataldo — Ingeniero Químico, Head of Analytical Development y creador de TSAP y Reciclápy.
