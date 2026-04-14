# 🚀 DROVA WORKERS - Setup Completo

## Qué son estos workers

**2 trabajadores autónomos 24/7 que funcionan mientras duermes:**

1. **Worker Captación** - Busca PYMEs en LinkedIn, genera leads, propone mensajes personalizados
2. **Worker Senior** - Te analiza Drova, da feedback estratégico, contesta preguntas

---

## 📋 Prerequisites

- Cuenta GitHub (gratis)
- API Key de Anthropic (gratis los primeros créditos)
- Nada más - TODO es automático

---

## ⚙️ Setup (5 minutos)

### PASO 1: Crea un repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `drova-workers`
3. Descripción: "Equipo IA autónomo para Drova Agency"
4. Público o privado (tu elección)
5. Crea el repositorio

---

### PASO 2: Sube los archivos

**En tu computadora:**

```bash
cd equipo-ia
git init
git add .
git commit -m "Initial commit - Drova workers"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/drova-workers.git
git push -u origin main
```

(Reemplaza `TU_USUARIO` con tu username de GitHub)

---

### PASO 3: Añade tu API Key de Anthropic

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Haz click en "New repository secret"
4. Name: `ANTHROPIC_API_KEY`
5. Value: Tu API Key (sk-ant-v0-...)
6. Save

---

### PASO 4: Activa GitHub Actions

1. Ve a la pestaña "Actions" en tu repositorio
2. Verás el workflow "Drova Workers - Captación & Senior"
3. Haz click y acepta activar

---

## 🎯 Cómo funciona

### Horario automático:

**Lunes a Viernes:**
- 9:00am - Worker Captación busca leads
- 12:00pm - Worker Senior analiza Drova
- 3:00pm - Worker Captación genera nuevos mensajes
- 6:00pm - Worker Senior prepara reporte del día

**Sábado:**
- 9:00am - Worker Captación
- 12:00pm - Worker Senior

---

## 📊 Cómo ver los resultados

### Opción 1: GitHub Actions

1. Ve a Actions → Últimos workflows
2. Haz click en el más reciente
3. Ver logs en tiempo real

### Opción 2: Artifacts

1. Actions → Workflow reciente
2. Baja hasta "Artifacts"
3. Descarga los reportes JSON

Reportes guardados 30 días automáticamente.

---

## 💬 Cómo hacer preguntas al Senior

**El Senior responde PREGUNTAS tuyas, no solo análisis automático.**

Para hacer una pregunta:

### Opción 1: Ejecutar localmente

```bash
set ANTHROPIC_API_KEY=tu-api-key
node worker-senior-drova.js "¿Debería renegociar con mi cliente peruano?"
```

### Opción 2: Trigger manual en GitHub

1. Actions → Drova Workers
2. Run workflow manually
3. Ver resultado en logs

---

## 📈 Qué esperar

### Semana 1:
- ✅ Workers corriendo sin errores
- ✅ Reportes guardándose automáticamente
- ✅ Senior analizando Drova diariamente

### Semana 2-3:
- ✅ 10-15 leads generados
- ✅ Mensajes personalizados listos
- ✅ Recomendaciones del Senior claras

### Semana 4+:
- ✅ Primeras respuestas de prospectos
- ✅ Meetings agendadas
- ✅ Leads calificados para cierre

---

## 💰 Costos

| Item | Costo |
|------|-------|
| GitHub Actions | GRATIS (3000 minutos/mes) |
| Anthropic API | $40-80/mes (por uso) |
| **TOTAL** | **$40-80/mes** |

Pagas solo lo que uses. **Sin sorpresas.**

---

## 🔧 Troubleshooting

### "Error: API Key inválida"
- Verifica que copiaste la key completa
- No debe tener espacios extras
- Ve a console.anthropic.com y copia de nuevo

### "Workflow no se ejecuta"
- Verifica que GitHub Actions está activo
- Ve a Actions tab y revisa el último run
- Mira los logs para ver el error

### "No veo reportes"
- Espera a que el workflow termine (5-10 minutos)
- Ve a Artifacts después
- O descarga los archivos manualmente

---

## 📞 Soporte rápido

Si algo no funciona:

1. Revisa los logs en GitHub Actions
2. Copia el error completo
3. Contacta conmigo con el error exacto

---

## 🚀 Listo para empezar?

1. ✅ Creas repo en GitHub
2. ✅ Subes los archivos
3. ✅ Añades API Key
4. ✅ Activas Actions
5. ✅ **Listo - funcionan solos**

---

**Los workers están vivos. Funcionan mientras duermes. Ve resultados cada mañana.** 🎯
