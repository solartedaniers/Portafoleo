import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

// 📖 Leer contenido
export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error al leer content.json:", error);
    return NextResponse.json({ error: "No se pudo leer el contenido." }, { status: 500 });
  }
}

// 💾 Guardar contenido
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al guardar content.json:", error);
    return NextResponse.json({ error: "No se pudo guardar el contenido." }, { status: 500 });
  }
}
