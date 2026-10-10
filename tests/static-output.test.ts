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

describe("i18n", () => {
  const cases = [
    {
      route: "",
      lang: "pt-BR",
      title: "Filipe Crespo — Engenheiro de Software",
    },
    { route: "en", lang: "en-US", title: "Filipe Crespo — Software Engineer" },
    {
      route: "es",
      lang: "es-ES",
      title: "Filipe Crespo — Ingeniero de Software",
    },
  ];

  for (const { route, lang, title } of cases) {
    test(`/${route} has lang ${lang} and localized title`, () => {
      const html = page(route);
      expect(html).toContain(`lang="${lang}"`);
      expect(html).toContain(`<title>${title}</title>`);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    });

    test(`/${route} has hreflang alternates`, () => {
      const html = page(route);
      const alternates = {
        "pt-BR": "https://filipecrespo.dev",
        "en-US": "https://filipecrespo.dev/en",
        "es-ES": "https://filipecrespo.dev/es",
        "x-default": "https://filipecrespo.dev",
      };
      for (const [hreflang, href] of Object.entries(alternates)) {
        const tag = html.match(
          new RegExp(`<link[^>]*hreflang="${hreflang}"[^>]*>`)
        )?.[0];
        expect(tag).toBeDefined();
        expect(tag).toContain(`href="${href}"`);
      }
    });
  }
});

describe("layout", () => {
  const switcherHrefs = { "": "/", en: "/en", es: "/es" };

  for (const route of ["", "en", "es"]) {
    test(`/${route} language switcher links to all locales`, () => {
      const html = page(route);
      for (const href of Object.values(switcherHrefs)) {
        expect(html).toMatch(
          new RegExp(`<a[^>]*href="${href}"[^>]*class="[^"]*\\blang-link`)
        );
      }
    });

    test(`/${route} marks the current locale with aria-current`, () => {
      const html = page(route);
      const current = switcherHrefs[route as keyof typeof switcherHrefs];
      expect(html).toMatch(
        new RegExp(
          `<a[^>]*href="${current}"[^>]*aria-current="page"|<a[^>]*aria-current="page"[^>]*href="${current}"`
        )
      );
    });

    test(`/${route} has skip link, header anchor and footer back-to-top`, () => {
      const html = page(route);
      expect(html).toContain('href="#main"');
      expect(html).toContain('id="main"');
      expect(html).toContain('id="top"');
      expect(html).toContain('href="#top"');
    });
  }
});

describe("home content", () => {
  test("hero shows the name as h1", () => {
    expect(page("")).toMatch(
      /<h1[^>]*>[\s\S]*Filipe[\s\S]*Crespo[\s\S]*<\/h1>/
    );
  });

  test("sections are numbered 01, 02, 03 in every locale", () => {
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      for (const id of ["about", "projects", "contact"]) {
        expect(html).toContain(`id="${id}"`);
      }
      expect(html.indexOf(">01<")).toBeGreaterThan(-1);
      expect(html.indexOf(">01<")).toBeLessThan(html.indexOf(">02<"));
      expect(html.indexOf(">02<")).toBeLessThan(html.indexOf(">03<"));
    }
  });

  test("Meus Prompts links out safely in a new tab", () => {
    const html = page("");
    expect(html).toMatch(
      /<a[^>]*href="https:\/\/meusprompts\.vercel\.app"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/
    );
    expect(html).toContain("(abre em nova aba)");
  });

  test("Brincaki renders without a link", () => {
    const html = page("");
    const at = html.indexOf("Brincaki</span>");
    expect(at).toBeGreaterThan(-1);
    const item = html.slice(
      html.lastIndexOf("<li", at),
      html.indexOf("</li>", at)
    );
    expect(item).not.toContain("<a ");
    expect(html).not.toContain('href="undefined"');
  });

  test("project descriptions are localized", () => {
    expect(page("en")).toContain(
      "A platform to create, publish and share AI prompts"
    );
    expect(page("es")).toContain(
      "Plataforma para crear, publicar y compartir prompts"
    );
  });

  test("contact has LinkedIn and GitHub but no e-mail", () => {
    const html = page("");
    expect(html).toContain("https://pt.linkedin.com/in/filipescrespo");
    expect(html).toContain("https://github.com/filipecrespodev");
    expect(html).not.toContain("mailto:");
  });

  test("portrait has localized alt text", () => {
    expect(page("en")).toContain(
      'alt="Black and white portrait of Filipe Soares Crespo"'
    );
  });
});
