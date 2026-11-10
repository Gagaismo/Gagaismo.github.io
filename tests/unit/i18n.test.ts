import { describe, expect, it } from "vitest";
import { getLangFromUrl, t, ui } from "../../src/i18n/ui";

describe("UI dictionary", () => {
  it("has exactly the same keys in es and en", () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  });

  it("has no empty values", () => {
    for (const [lang, dict] of Object.entries(ui)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim(), `${lang}.${key}`).not.toBe("");
      }
    }
  });

  it("translates the contact CTA per language", () => {
    expect(t("es", "contact.email")).toBe("Escribime por email");
    expect(t("en", "contact.email")).toBe("Email me");
  });

  it("reads the language from the URL and falls back to es", () => {
    expect(getLangFromUrl(new URL("https://gagaismo.github.io/en/"))).toBe("en");
    expect(getLangFromUrl(new URL("https://gagaismo.github.io/es/"))).toBe("es");
    expect(getLangFromUrl(new URL("https://gagaismo.github.io/"))).toBe("es");
  });
});
