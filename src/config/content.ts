import contentEs from "../../data/content_es.json";
import contentEn from "../../data/content_en.json";

export type Lang = "es" | "en";
export type Content = Record<string, unknown>;

export const SUPPORTED_LANGS: readonly Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export const CONTENT_BY_LANG: Record<Lang, Content> = {
  es: contentEs as Content,
  en: contentEn as Content,
};

export function isSupportedLang(value: unknown): value is Lang {
  return typeof value === "string" && (SUPPORTED_LANGS as readonly string[]).includes(value);
}
