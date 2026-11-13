import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DEFAULT_LANG, isSupportedLang, type Lang } from "@/config/content";

const DATA_DIR = path.join(process.cwd(), "data");

// Solo acepto idiomas conocidos para que nadie pueda leer o escribir otros archivos
function resolveLang(req: Request): Lang | null {
  const value = new URL(req.url).searchParams.get("lang") ?? DEFAULT_LANG;
  return isSupportedLang(value) ? value : null;
}

function contentPath(lang: Lang): string {
  return path.join(DATA_DIR, `content_${lang}.json`);
}

export async function GET(req: Request) {
  const lang = resolveLang(req);
  if (!lang) return NextResponse.json({ error: "Unsupported language" }, { status: 400 });

  try {
    const data = await fs.readFile(contentPath(lang), "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Content could not be read" }, { status: 500 });
  }
}

// El editor solo escribe en local: en producción nadie puede modificar el contenido
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Editing is disabled" }, { status: 403 });
  }

  const lang = resolveLang(req);
  if (!lang) return NextResponse.json({ error: "Unsupported language" }, { status: 400 });

  try {
    const body = await req.json();
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }
    await fs.writeFile(contentPath(lang), JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Content could not be saved" }, { status: 500 });
  }
}
