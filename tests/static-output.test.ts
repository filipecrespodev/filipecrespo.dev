import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(import.meta.dir, "..", ".output", "public");
const page = (route: string) =>
  readFileSync(join(out, route, "index.html"), "utf8");

describe("static output", () => {
  test("generates the home page", () => {
    expect(existsSync(join(out, "index.html"))).toBe(true);
  });

  test("does not generate blog or projetos pages", () => {
    expect(existsSync(join(out, "blog"))).toBe(false);
    expect(existsSync(join(out, "projetos"))).toBe(false);
  });

  test("home page has no links to removed routes", () => {
    const html = page("");
    expect(html).not.toContain('href="/blog');
    expect(html).not.toContain('href="/projetos');
  });
});
