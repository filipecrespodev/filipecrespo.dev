import { expect, test } from "bun:test";
import ptBR from "../i18n/locales/pt-BR.json";
import en from "../i18n/locales/en.json";
import es from "../i18n/locales/es.json";

type Messages = { [key: string]: string | Messages };

const keys = (obj: Messages, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "string" ? [`${prefix}${k}`] : keys(v, `${prefix}${k}.`)
  );

test("en has the same keys as pt-BR", () => {
  expect(keys(en).sort()).toEqual(keys(ptBR).sort());
});

test("es has the same keys as pt-BR", () => {
  expect(keys(es).sort()).toEqual(keys(ptBR).sort());
});

test("no message is empty", () => {
  for (const messages of [ptBR, en, es]) {
    for (const key of keys(messages)) {
      const value = key
        .split(".")
        .reduce<unknown>((o, k) => (o as Messages)[k], messages);
      expect(String(value).trim().length).toBeGreaterThan(0);
    }
  }
});
