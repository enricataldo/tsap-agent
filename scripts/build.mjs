import fs from "node:fs";

const html = fs.readFileSync(new URL("../source/index.html", import.meta.url), "utf8");
const htmlBase64 = Buffer.from(html).toString("base64");
const profiles = [
  { name: "Perfil de Producción Industrial", area: "Procesos, planta, eficiencia y liderazgo operativo" },
  { name: "Perfil de Desarrollo Analítico", area: "Industria farmacéutica, métodos, HPLC y validaciones" },
  { name: "Perfil de Logística Farmacéutica", area: "Calidad, almacenamiento y productos terminados" },
  { name: "Perfil de Ingeniería de Procesos", area: "Operaciones unitarias, equipos y dimensionamiento" },
  { name: "Perfil de Industria de Gelatina", area: "Producción de gelatina, operaciones unitarias y carrera" },
  { name: "Perfil de Sistemas de Calidad", area: "Normalización, metrología y evaluación de conformidad" },
  { name: "Perfil de Agroindustria", area: "Granos, sal, azúcar, alcohol y molienda" },
  { name: "Perfil de Mbocayá", area: "Cultivo, procesamiento y comercialización del cocotero" },
  { name: "Perfil Cervecero", area: "Elaboración de cerveza y gestión de fábrica" }
];

const worker = `const PAGE_BASE64 = ${JSON.stringify(htmlBase64)};
const PROFILES = ${JSON.stringify(profiles)};
const decodePage = () => Uint8Array.from(atob(PAGE_BASE64), c => c.charCodeAt(0));

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

function extractText(response) {
  for (const item of response.output || []) for (const content of item.content || []) if (content.type === "output_text" && content.text) return content.text;
  return "";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return json({ online: Boolean(env.OPENAI_API_KEY) }, env.OPENAI_API_KEY ? 200 : 503);
    if (url.pathname === "/api/route" && request.method === "POST") {
      if (!env.OPENAI_API_KEY) return json({ error: "AI unavailable" }, 503);
      let question = "";
      try { question = String((await request.json()).question || "").trim().slice(0, 1200); } catch { return json({ error: "Invalid request" }, 400); }
      if (!question) return json({ error: "Question required" }, 400);
      const names = PROFILES.map(p => p.name);
      const prompt = "Sos el agente de enrutamiento de TSAP. No respondas la consulta técnica. Elegí exclusivamente el perfil profesional más adecuado de la lista suministrada. Priorizá experiencia práctica específica y explicá la coincidencia en una sola oración clara en español. Si la consulta es ambigua, elegí el perfil más cercano sin inventar antecedentes.";
      const apiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "authorization": "Bearer " + env.OPENAI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-5-mini",
          input: [{ role: "system", content: [{ type: "input_text", text: prompt }] }, { role: "user", content: [{ type: "input_text", text: "Perfiles: " + JSON.stringify(PROFILES) + "\\n\\nPregunta: " + question }] }],
          text: { format: { type: "json_schema", name: "tsap_routing", strict: true, schema: { type: "object", properties: { profile_name: { type: "string", enum: names }, reason: { type: "string" }, confidence: { type: "string", enum: ["Alta afinidad", "Buena afinidad", "Revisión sugerida"] } }, required: ["profile_name", "reason", "confidence"], additionalProperties: false } } }
        })
      });
      if (!apiResponse.ok) return json({ error: "AI request failed" }, 502);
      const payload = await apiResponse.json();
      try { return json(JSON.parse(extractText(payload))); } catch { return json({ error: "Invalid AI response" }, 502); }
    }
    if (url.pathname !== "/" && url.pathname !== "/index.html") return new Response("Not found", { status: 404 });
    return new Response(decodePage(), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300", "x-content-type-options": "nosniff" } });
  }
};
`;

fs.rmSync(new URL("../dist", import.meta.url), { recursive: true, force: true });
fs.mkdirSync(new URL("../dist/server", import.meta.url), { recursive: true });
fs.mkdirSync(new URL("../dist/.openai", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../dist/server/index.js", import.meta.url), worker);
fs.copyFileSync(new URL("../.openai/hosting.json", import.meta.url), new URL("../dist/.openai/hosting.json", import.meta.url));
console.log("TSAP Agent built successfully");
