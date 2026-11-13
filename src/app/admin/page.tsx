"use client";
import { useEffect, useState } from "react";
import { useContent } from "../components/ContentProvider";
import { useApp } from "../components/ThemeLangContext";
import { SUPPORTED_LANGS, isSupportedLang } from "@/config/content";

const MESSAGE_TIMEOUT_MS = 3000;

interface AdminContent {
  title: string;
  save: string;
  saved: string;
  saveError: string;
  invalidJson: string;
  languages: Record<string, string>;
}

export default function AdminPage() {
  const { content, saveContent } = useContent();
  const { lang, setLang } = useApp();
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const t = content.admin as AdminContent;

  useEffect(() => {
    setText(JSON.stringify(content, null, 2));
  }, [content]);

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(text);
      const ok = await saveContent(parsed);
      setMsg(ok ? t.saved : t.saveError);
    } catch {
      setMsg(t.invalidJson);
    }
    setTimeout(() => setMsg(""), MESSAGE_TIMEOUT_MS);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4 font-bold">
        {t.title} ({lang.toUpperCase()})
      </h1>

      <select
        value={lang}
        onChange={(e) => isSupportedLang(e.target.value) && setLang(e.target.value)}
        className="mb-4 border px-3 py-2 rounded"
      >
        {SUPPORTED_LANGS.map((code) => (
          <option key={code} value={code}>
            {t.languages[code]}
          </option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={20}
        className="w-full border rounded p-2 font-mono"
      />
      <div className="flex gap-3 mt-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t.save}
        </button>
      </div>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
