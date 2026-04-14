const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// WORKER CAPTACIÓN - DROVA AGENCY
// ============================================

const CAPTACION_PROMPT = `Eres el agente de captación de Drova Agency.
Tu rol es actuar como SDR y especialista en prospección outbound para una agencia pequeña y moderna que ofrece marketing externalizado para PYMEs, con una capa de automatización, datos e IA como diferenciador.
Tu trabajo no es enviar mensajes genéricos ni llenar el pipeline de leads malos. Tu trabajo es identificar negocios con potencial real, contactar con claridad y generar conversaciones comerciales útiles para Drova.
## Contexto de Drova
- Drova es una agencia en etapa temprana.
- Su oferta principal es funcionar como departamento de marketing externalizado para PYMEs.
- Su diferenciador es operar con una capa de automatización, datos e inteligencia artificial.
- La prioridad actual es conseguir al menos 2 o 3 clientes más.
- Drova no quiere una captación masiva y vacía; quiere leads con encaje razonable, potencial de retainer y necesidad real.
## Qué tipo de empresas debes buscar
Debes buscar principalmente PYMEs que cumplan la mayor cantidad posible de estas características:
- Negocios de servicios o negocios tradicionales que dependen de captar clientes
- Empresas con poca estructura interna de marketing
- Empresas que probablemente no puedan contratar un equipo interno completo
- Empresas que ya hacen algo de marketing, pero de forma desordenada, débil o poco medible
- Empresas que pueden beneficiarse de delegar marketing, reporting, seguimiento o automatización ligera
- Empresas donde la rapidez de respuesta, la captación o la visibilidad comercial impactan directamente en ingresos
- Empresas con suficiente capacidad económica para pagar un servicio mensual
- Empresas donde Drova pueda aportar orden, ejecución y mejora de rendimiento sin una complejidad excesiva
## Sectores sugeridos
Prioriza sectores como: clínicas, estética, academias, despachos, inmobiliarias pequeñas o medianas, negocios locales premium, empresas de reformas, negocios de servicios especializados, educación privada, wellness o salud.
## Sistema de clasificación de leads
Clasifica cada lead en una de estas categorías:
- A: Muy buen encaje (necesidad clara, capacidad de pago probable, potencial de retainer, complejidad manejable)
- B: Buen encaje con dudas (hay oportunidad real pero falta validar presupuesto, urgencia o madurez)
- C: Encaje débil (curiosidad o necesidad poco clara, presupuesto dudoso, bajo potencial de retainer)
- D: No encaja (demasiado pequeño, demasiado complejo, sin presupuesto, sin necesidad evidente)
## Qué entregas en cada lead
Para cada lead debes producir:
1. nombre de empresa
2. sector
3. motivo de encaje
4. hipótesis de dolor principal
5. ángulo de mensaje recomendado
6. primer mensaje outbound
7. follow-up 1
8. follow-up 2
9. follow-up final
10. clasificación A/B/C/D
## Cómo debes responder
- Sé concreto
- Sé comercial, pero sin exagerar
- No inventes datos no justificados
- No uses frases vacías
- Prioriza calidad sobre volumen
- Si un lead no encaja, dilo sin miedo
## Regla máxima
Tu objetivo no es conseguir respuestas a cualquier precio.
Tu objetivo es conseguir conversaciones útiles con PYMEs que puedan convertirse en clientes sostenibles para Drova.`;

async function buscarYGenerarLeads() {
  console.log(`\n${"═".repeat(80)}`);
  console.log(
    `🎯 WORKER CAPTACIÓN - BÚSQUEDA DE LEADS ${new Date().toLocaleString("es-ES")}`
  );
  console.log(`${"═".repeat(80)}\n`);

  try {
    const respuesta = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `${CAPTACION_PROMPT}

HOY BUSCO: Genera un perfil realista de 5 leads potenciales para Drova.

Para CADA lead, proporciona:
1. Nombre empresa (real o creíble)
2. Sector
3. Motivo de encaje
4. Hipótesis de dolor
5. Ángulo de mensaje
6. Primer mensaje LinkedIn (personalizado)
7. Follow-up 1 (3-4 días después)
8. Follow-up 2 (5-7 días después)
9. Follow-up final (7-10 días después)
10. Clasificación A/B/C/D

Prioriza CALIDAD sobre volumen. Si un lead no encaja, no lo incluyas.

Formato JSON para fácil procesamiento.`,
        },
      ],
    });

    const contenido =
      respuesta.content[0].type === "text" ? respuesta.content[0].text : "";

    console.log("📋 LEADS GENERADOS:\n");
    console.log(contenido);
    console.log("\n");

    guardarReporteCaptacion(contenido);

    return contenido;
  } catch (error) {
    console.error("❌ Error en Worker Captación:", error.message);
    return null;
  }
}

async function generarMensajePara(nombreEmpresa, sector, dolor) {
  console.log(`\n${"═".repeat(80)}`);
  console.log(`🎯 GENERANDO MENSAJE PARA: ${nombreEmpresa}`);
  console.log(`${"═".repeat(80)}\n`);

  try {
    const respuesta = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `${CAPTACION_PROMPT}

CLIENTE ESPECÍFICO:
- Empresa: ${nombreEmpresa}
- Sector: ${sector}
- Dolor principal: ${dolor}

Genera:
1. Primer mensaje LinkedIn (máx 150 palabras)
2. Follow-up 1 (si no responde en 3 días)
3. Follow-up 2 (si no responde en 5 días)
4. Follow-up final (si no responde en 7 días)

Cada mensaje debe ser personalizado, directo y sin sonar como spam.`,
        },
      ],
    });

    const contenido =
      respuesta.content[0].type === "text" ? respuesta.content[0].text : "";

    console.log("💬 MENSAJES GENERADOS:\n");
    console.log(contenido);
    console.log("\n");

    return contenido;
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

function guardarReporteCaptacion(contenido) {
  const reporte = {
    timestamp: new Date().toISOString(),
    leadsGenerados: contenido,
    estadisticas: {
      ejecutadoEn: new Date().toLocaleString("es-ES"),
      zona: "Barcelona (CET)",
    },
  };

  const archivo = `C:\\Users\\fabri\\equipo-ia\\captacion-reporte-${Date.now()}.json`;
  fs.writeFileSync(archivo, JSON.stringify(reporte, null, 2));
  console.log(`✅ Reporte guardado: ${archivo}`);
}

// Ejecutar búsqueda de leads
buscarYGenerarLeads();

// Permitir búsqueda específica
if (process.argv.length > 2) {
  const empresa = process.argv[2];
  const sector = process.argv[3] || "desconocido";
  const dolor = process.argv.slice(4).join(" ") || "captación";
  generarMensajePara(empresa, sector, dolor);
}
