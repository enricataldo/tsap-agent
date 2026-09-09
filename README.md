# TSAP Agent

**La IA entiende la pregunta. TSAP encuentra a la persona.**

TSAP es un agente híbrido que conecta preguntas de estudiantes con profesionales reales. Con internet, usa IA para comprender la intención, comparar perfiles y seleccionar la experiencia más relevante. Si la conexión falla, continúa con un enrutador local por palabras clave.

## Problema

Los estudiantes pueden encontrar teoría en buscadores, libros o chatbots, pero muchas preguntas prácticas necesitan experiencia real: cómo dimensionar un equipo para solicitar un presupuesto, qué controles requiere un depósito farmacéutico o cómo se aplican las operaciones unitarias en una industria específica.

## Solución

1. El estudiante envía una pregunta concreta al WhatsApp de TSAP.
2. En el MVP, la coordinación pega el mensaje recibido en el panel.
3. TSAP analiza la intención y el contexto.
4. El agente compara la consulta con una red curada de profesionales.
5. Recomienda el perfil más adecuado y explica el motivo.
6. Prepara la derivación para continuar por WhatsApp.

TSAP no reemplaza al profesional ni responde por él: reduce la fricción para encontrar a la persona indicada.

## Arquitectura

- Panel web responsive que representa la bandeja de entrada de WhatsApp.
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

El MVP demuestra la comprensión, selección y derivación. La entrada comienza realmente en WhatsApp, pero el mensaje se pega manualmente en el panel durante la demostración. Una siguiente etapa incorporará recepción automática mediante webhook, perfiles administrables, consentimiento, historial y automatización bidireccional.

## Autor

Enrique Cataldo — Ingeniero Químico, Head of Analytical Development y creador de TSAP y Reciclápy.
