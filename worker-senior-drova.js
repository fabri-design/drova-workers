const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// WORKER SENIOR - DROVA AGENCY
// ============================================

const SENIOR_PROMPT = `Eres mi experto en levantar agencias pequeñas y modernas de servicios, especialmente agencias apalancadas con automatización, IA, paid media, contenido y sistemas ligeros.
Tu rol es actuar como mentor estratégico, operador de negocio, advisor comercial y revisor de decisiones para Drova Agency.
## Contexto de Drova
- Drova es una agencia en etapa temprana.
- Quiero construir un negocio que pueda durar al menos 3 años, crecer con orden y mejorar con nuevos modelos de IA.
- Mi visión es que Drova funcione como un departamento de marketing externalizado para PYMEs, con una capa superior de automatización, datos e inteligencia artificial.
- No quiero construir una agencia pesada, sino una estructura más eficiente y rentable.
- Hoy tengo 1 cliente por subcontratación que en la práctica son 5 cuentas.
- Ingreso aproximadamente 450€.
- En esas cuentas hago estrategia de paid, reporting, subida de contenidos y en 3 de ellas también community management.
- No hago diseño ni edición de piezas; solo operación, publicación, seguimiento y estrategia.
- Uso herramientas como Metricool y ManyChat para automatizar tareas.
- Las herramientas me cuestan entre 20% y 30% de esos ingresos.
- Necesito conseguir al menos 2 o 3 clientes más para poder sobrevivir y dedicarme por completo a Drova.
- Tengo experiencia en agencia grande y en procesos estructurados, pero me cuesta más montar un negocio pequeño desde cero.
- Prefiero usar plataformas ya resueltas aunque sean un poco más caras, si eso me ahorra tiempo, energía y complejidad.
- La parte de "trabajadores IA" y automatizaciones internas todavía está en fase de prueba y validación dentro de mi propio negocio.
## Tu objetivo principal
Ayudarme a construir una agencia pequeña, clara, rentable y ordenada, priorizando supervivencia, captación, enfoque, margen y repetibilidad.
## Cómo debes pensar
1. Distingue siempre entre: lo validado, lo prometedor pero no validado, lo accesorio o distractor
2. Prioriza ingresos antes que sofisticación.
3. Prioriza claridad comercial antes que ambición narrativa.
4. Prioriza una oferta simple y vendible antes que una visión demasiado amplia.
5. No me dejes pensar como una agencia grande si todavía necesito simplicidad extrema.
6. Señala cuando esté complicando innecesariamente el negocio.
7. Ayúdame a convertir visión en un plan realista de 30, 60 y 90 días.
8. Usa la IA como ventaja operativa y de diferenciación, no como humo comercial.
9. Oblígame a pensar en capacidad de entrega, margen y sostenibilidad, no solo en captar clientes.
10. Si una idea suena bien pero no ayuda a conseguir clientes o mejorar estructura en el corto plazo, bájale prioridad.
## Cómo debes responder
- Sé directo.
- Sé honesto.
- Sé accionable.
- No me halagues sin motivo.
- Corrige mis sesgos o autoengaños.
- Oblígame a tomar decisiones.
- Cuando haga falta, compórtate como un advisor exigente, no como un animador.
- Si me falta contexto para responder bien, pídeme solo la información mínima necesaria.`;

async function analizarDrova() {
  console.log(`\n${"═".repeat(80)}`);
  console.log(
    `👨‍💼 WORKER SENIOR - ANÁLISIS DE DROVA ${new Date().toLocaleString("es-ES")}`
  );
  console.log(`${"═".repeat(80)}\n`);

  const preguntasAnalisis = [
    "¿Cuál es el cuello de botella #1 de Drova ahora mismo? Sé directo: ¿Es captación, delivery, pricing, foco o narrativa?",
    "¿Está validado que mi modelo de automatización funciona? ¿O todavía es hipótesis?",
    "Mi cliente peruano paga 450€ por 5 cuentas. ¿Debería renegociar a 800€ AHORA o esperar?",
    "¿Qué cambio operativo tendría el mayor impacto en mi margen esta semana?",
    "¿Estoy complicando innecesariamente el negocio con los workers de IA ahora?",
  ];

  const preguntaDelDia =
    preguntasAnalisis[Math.floor(Math.random() * preguntasAnalisis.length)];

  try {
    const respuesta = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `${SENIOR_PROMPT}

HOY ANALIZO:
${preguntaDelDia}

Responde como mi mentor exigente. Sé directo, honesto y accionable.`,
        },
      ],
    });

    const contenido =
      respuesta.content[0].type === "text" ? respuesta.content[0].text : "";

    console.log("📊 ANÁLISIS DEL DÍA:\n");
    console.log(contenido);
    console.log("\n");

    guardarReporteSenior(preguntaDelDia, contenido);

    return contenido;
  } catch (error) {
    console.error("❌ Error en Worker Senior:", error.message);
    return null;
  }
}

async function responderPregunta(pregunta) {
  console.log(`\n${"═".repeat(80)}`);
  console.log(`👨‍💼 WORKER SENIOR - RESPUESTA A TU PREGUNTA`);
  console.log(`${"═".repeat(80)}\n`);
  console.log(`❓ Pregunta: ${pregunta}\n`);

  try {
    const respuesta = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `${SENIOR_PROMPT}

PREGUNTA DEL USUARIO:
${pregunta}

Sé directo, honesto y accionable. Dale la respuesta que necesita oír, no la que quiere oír.`,
        },
      ],
    });

    const contenido =
      respuesta.content[0].type === "text" ? respuesta.content[0].text : "";

    console.log("💬 RESPUESTA:\n");
    console.log(contenido);
    console.log("\n");

    return contenido;
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

function guardarReporteSenior(pregunta, respuesta) {
  const reporte = {
    timestamp: new Date().toISOString(),
    pregunta: pregunta,
    respuesta: respuesta,
  };

  const archivo = `C:\\Users\\fabri\\equipo-ia\\senior-reporte-${Date.now()}.json`;
  fs.writeFileSync(archivo, JSON.stringify(reporte, null, 2));
  console.log(`✅ Reporte guardado: ${archivo}`);
}

// Ejecutar análisis automático al iniciar
analizarDrova();

// Permitir preguntas interactivas
if (process.argv.length > 2) {
  const pregunta = process.argv.slice(2).join(" ");
  responderPregunta(pregunta);
}
