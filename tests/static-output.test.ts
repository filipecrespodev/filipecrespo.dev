import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
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

  test("sections are numbered 01 to 06 in every locale", () => {
    const ids = [
      "about",
      "services",
      "process",
      "projects",
      "experience",
      "contact",
    ];
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      for (const id of ids) {
        expect(html).toContain(`id="${id}"`);
      }
      const numbers = ["01", "02", "03", "04", "05", "06"].map((n) =>
        html.indexOf(`>${n}<`)
      );
      expect(numbers[0]).toBeGreaterThan(-1);
      expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    }
  });

  test("hero has a call to action pointing to the contact section", () => {
    const html = page("");
    expect(html).toMatch(/<a[^>]*href="#contact"[^>]*class="button"/);
    expect(html).toContain("Disponível para novos projetos");
  });

  test("work links out safely in a new tab", () => {
    const html = page("");
    for (const url of [
      "https://larabordalo.com",
      "https://virginiaory.com",
      "https://www.inlineprojetos.com",
      "https://meusprompts.com.br",
      "https://meus-prompts.github.io/brincaki/",
    ]) {
      expect(html).toMatch(
        new RegExp(
          `<a[^>]*href="${url.replace(/\./g, "\\.")}"[^>]*target="_blank"[^>]*rel="noopener noreferrer"`
        )
      );
    }
    expect(html).toContain("(abre em nova aba)");
    expect(html).not.toContain('href="undefined"');
  });

  test("experience lists past companies", () => {
    const html = page("en");
    for (const company of ["Facily", "Locaweb", "Novax Telecom"]) {
      expect(html).toContain(company);
    }
  });

  test("contact form only renders when an endpoint is configured", () => {
    const html = page("");
    if (process.env.NUXT_PUBLIC_CONTACT_FORM_ENDPOINT) {
      expect(html).toContain('class="contact-form');
      expect(html).toContain('for="contact-email"');
    } else {
      expect(html).not.toContain('class="contact-form');
    }
  });

  test("project descriptions are localized", () => {
    expect(page("en")).toContain(
      "A platform to create, organize and share AI prompts"
    );
    expect(page("es")).toContain(
      "Plataforma para crear, organizar y compartir prompts"
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

describe("animations", () => {
  test("no element ships hidden in the static HTML", () => {
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      expect(html).not.toMatch(/class="[^"]*\breveal\b/);
    }
  });

  test("motion is gated behind prefers-reduced-motion", () => {
    const cssDir = join(out, "_nuxt");
    const css = readdirSync(cssDir)
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(join(cssDir, f), "utf8"))
      .join("\n");
    expect(css).toMatch(/@keyframes hero-rise/);
    expect(css).toMatch(/prefers-reduced-motion:\s*no-preference/);
    expect(css).toContain(".reveal.is-visible");
  });
});

describe("review fixes", () => {
  const builtCss = () => {
    const cssDir = join(out, "_nuxt");
    return readdirSync(cssDir)
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(join(cssDir, f), "utf8"))
      .join("\n");
  };

  test("project status is never hidden (stays visible on mobile)", () => {
    expect(builtCss()).not.toMatch(
      /\.project-status\[[^\]]+\]\{[^}]*display:\s*none/
    );
  });

  test("hero name animation never makes the h1 transparent", () => {
    const css = builtCss();
    const rule = css.match(
      /\.hero-line\[[^\]]+\][^{]*\{[^}]*animation:([\w-]+)/
    );
    expect(rule).not.toBeNull();
    const name = rule![1];
    const keyframes = css.match(
      new RegExp(`@keyframes ${name}\\{(?:[^{}]*\\{[^}]*\\})*[^}]*\\}`)
    )?.[0];
    expect(keyframes).toBeDefined();
    expect(keyframes).not.toContain("opacity");
  });
});

describe("scroll elements", () => {
  const builtCss = () => {
    const cssDir = join(out, "_nuxt");
    return readdirSync(cssDir)
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(join(cssDir, f), "utf8"))
      .join("\n");
  };

  test("header sticks to the top and anchors leave room for it", () => {
    const css = builtCss();
    expect(css).toMatch(/\.site-header\[[^\]]+\]\{[^}]*position:\s*sticky/);
    expect(css).toMatch(/scroll-padding-top:/);
  });

  test("#top is not the sticky header (a stuck element cannot be scrolled to)", () => {
    expect(page("")).not.toMatch(/<header[^>]*id="top"/);
  });

  test("every section has a sticky eyebrow and decorative rule and ticks", () => {
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      expect(html.match(/class="section-eyebrow/g)?.length).toBe(6);
      expect(
        html.match(/<span[^>]*aria-hidden="true"[^>]*class="section-rule/g)
          ?.length
      ).toBe(6);
      expect(
        html.match(/<span[^>]*aria-hidden="true"[^>]*class="tick\b/g)?.length
      ).toBe(12);
    }
    expect(builtCss()).toMatch(
      /\.section-eyebrow\[[^\]]+\]\{[^}]*position:\s*sticky/
    );
  });

  test("section rule draws above the sticky eyebrow (visible on mobile)", () => {
    const css = builtCss();
    // The minifier may group selectors: ".a[x],.b[x]{...z-index:11}".
    const z = (sel: string) =>
      Number(
        css.match(
          new RegExp(`\\.${sel}\\[[^\\]]+\\](?:,[^{]*)?\\{[^}]*z-index:(\\d+)`)
        )?.[1]
      );
    expect(z("section-rule")).toBeGreaterThan(z("section-eyebrow"));
  });

  test("marquee repeats its track for screen readers only once", () => {
    const html = page("");
    const tracks = html.match(/<ul[^>]*class="marquee-track[^>]*>/g) ?? [];
    expect(tracks).toHaveLength(2);
    expect(tracks[0]).not.toContain("aria-hidden");
    expect(tracks[1]).toContain('aria-hidden="true"');
  });

  test("marquee can be paused (WCAG 2.2.2) with a localized label", () => {
    const pt = page("");
    expect(pt).toMatch(
      /<button[^>]*aria-pressed="false"[^>]*class="marquee-toggle/
    );
    expect(pt).toContain('aria-label="Pausar animação"');
    expect(page("en")).toContain('aria-label="Pause animation"');
    expect(page("es")).toContain('aria-label="Pausar animación"');
  });

  test("choreography never ships hidden in the static HTML", () => {
    for (const route of ["", "en", "es"]) {
      expect(page(route)).not.toMatch(/class="[^"]*\bchoreo\b/);
    }
    expect(builtCss()).toContain(".choreo.is-visible");
  });

  test("smooth scroll uses Lenis and respects reduced motion", () => {
    const pkg = JSON.parse(
      readFileSync(join(import.meta.dir, "..", "package.json"), "utf8")
    );
    expect(pkg.dependencies.lenis).toBeDefined();
    const plugin = readFileSync(
      join(import.meta.dir, "..", "app", "plugins", "smooth-scroll.client.ts"),
      "utf8"
    );
    expect(plugin).toContain("prefers-reduced-motion");
  });
});

describe("terminal nav", () => {
  const ids = [
    "about",
    "services",
    "process",
    "projects",
    "experience",
    "contact",
  ];

  for (const route of ["", "en", "es"]) {
    test(`/${route} lists every section as a link`, () => {
      const html = page(route);
      const nav = html.slice(
        html.indexOf('<aside class="term'),
        html.indexOf("</aside>")
      );
      for (const id of ids) {
        expect(nav).toMatch(
          new RegExp(`<a[^>]*href="#${id}"[^>]*class="term-link`)
        );
      }
      expect(nav).toMatch(/<nav[^>]*aria-label="[^"]+"/);
    });
  }

  test("first section starts as current and slugs drop accents", () => {
    const html = page("");
    expect(html).toMatch(/href="#about"[^>]*aria-current="true"/);
    expect(html).toContain("servicos/");
    expect(html).toContain("como-trabalho/");
  });

  test("decorative terminal parts are hidden from screen readers", () => {
    const html = page("");
    for (const cls of [
      "term-bar",
      "term-status",
      "term-gutter",
      "term-progress",
    ]) {
      expect(html).toMatch(
        new RegExp(
          `class="${cls}"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*class="${cls}"`
        )
      );
    }
  });
});
