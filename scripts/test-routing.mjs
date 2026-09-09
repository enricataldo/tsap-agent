import fs from "node:fs";
const html=fs.readFileSync(new URL("../source/index.html",import.meta.url),"utf8");
if(!html.includes("/api/route")) throw new Error("Online AI route missing");
if(!html.includes("Respaldo local activo")) throw new Error("Offline fallback missing");
if(!html.includes("595981611917")) throw new Error("WhatsApp handoff missing");
console.log("Hybrid routing checks passed");
