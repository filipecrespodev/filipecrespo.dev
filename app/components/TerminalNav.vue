<script setup lang="ts">
export interface NavSection {
  id: string;
  label: string;
}

const { sections } = defineProps<{ sections: NavSection[] }>();
const { t } = useI18n();

const LINES = 240;
const BAR = 16;

const slug = (label: string) =>
  label.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, "-");

const activeId = ref(sections[0]?.id ?? "");
const progress = ref(0);
const typed = ref(`~/${slug(sections[0]?.label ?? "")}`);
const gutterShift = ref(0);
const gutter = ref<HTMLElement>();

const active = computed(
  () => sections.find((s) => s.id === activeId.value) ?? sections[0]
);
const percent = computed(() => Math.round(progress.value * 100));
const line = ref(1);
const filled = computed(() => Math.round(progress.value * BAR));

let reducedMotion = false;
let typingTimer: ReturnType<typeof setInterval> | undefined;
let frame = 0;

// Re-type the `cd` command whenever the visitor reaches a new section.
watch(activeId, () => {
  const target = `~/${slug(active.value?.label ?? "")}`;
  clearInterval(typingTimer);
  if (reducedMotion) {
    typed.value = target;
    return;
  }
  typed.value = "";
  let i = 0;
  typingTimer = setInterval(() => {
    typed.value = target.slice(0, ++i);
    if (i >= target.length) clearInterval(typingTimer);
  }, 35);
});

function update() {
  frame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

  const threshold = window.innerHeight * 0.35;
  let current = sections[0]?.id ?? "";
  for (const { id } of sections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) current = id;
  }
  activeId.value = current;

  // The line numbers scroll past a fixed cursor, like the ruler on getartcraft.com.
  const el = gutter.value;
  if (!reducedMotion && el && el.clientHeight > 0) {
    const lineHeight = el.scrollHeight / LINES;
    const track = el.scrollHeight - el.clientHeight;
    gutterShift.value = -progress.value * track;
    // Report the line actually sitting under the cursor.
    const under = (el.clientHeight / 2 - gutterShift.value) / lineHeight;
    line.value = Math.min(LINES, Math.max(1, Math.ceil(under)));
  } else {
    line.value = Math.max(1, Math.round(progress.value * LINES));
  }
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(update);
}

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  cancelAnimationFrame(frame);
  clearInterval(typingTimer);
});
</script>

<template>
  <aside class="term">
    <div class="term-window">
      <div class="term-bar" aria-hidden="true">
        <span class="term-dots"><span /><span /><span /></span>
        <span class="term-title">filipe@crespo: ~</span>
      </div>

      <div class="term-screen">
        <p class="term-line" aria-hidden="true">
          <span class="term-prompt">$</span> cd {{ typed
          }}<span class="term-caret" />
        </p>
        <p class="term-current" aria-hidden="true">
          {{ active?.label }}
        </p>

        <nav :aria-label="t('a11y.sections')">
          <p class="term-line term-line--muted" aria-hidden="true">
            <span class="term-prompt">$</span> ls
          </p>
          <ol class="term-list">
            <li v-for="(section, index) in sections" :key="section.id">
              <a
                :href="`#${section.id}`"
                class="term-link"
                :aria-current="section.id === activeId ? 'true' : undefined"
              >
                <span class="term-index">{{
                  String(index + 1).padStart(2, "0")
                }}</span>
                {{ slug(section.label) }}/
              </a>
            </li>
          </ol>
        </nav>

        <p class="term-progress" aria-hidden="true">
          [<span class="term-progress-fill">{{ "█".repeat(filled) }}</span
          >{{ "░".repeat(BAR - filled) }}] {{ percent }}%
        </p>
      </div>

      <div class="term-status" aria-hidden="true">
        <span class="term-mode">NORMAL</span>
        <span class="term-path">~/{{ slug(active?.label ?? "") }}</span>
        <span class="term-pos">ln {{ line }} · {{ percent }}%</span>
      </div>
    </div>

    <div ref="gutter" class="term-gutter" aria-hidden="true">
      <span
        class="term-gutter-track"
        :style="{ transform: `translateY(${gutterShift}px)` }"
      >
        <span v-for="n in LINES" :key="n" class="term-gutter-line" />
      </span>
      <span class="term-cursor">{{ line }}</span>
    </div>
  </aside>
</template>

<style scoped>
.term {
  position: sticky;
  bottom: 0;
  z-index: 20;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.term-window {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

/* Small screens: only the status line, docked at the bottom of the page. */
.term-bar,
.term-screen,
.term-gutter {
  display: none;
}

.term-status {
  display: flex;
  align-items: stretch;
  border-top: 1px solid var(--line);
  background: var(--bg);
  color: var(--muted);
  font-size: 0.75rem;
  white-space: nowrap;
}

.term-status > span {
  flex-shrink: 0;
  padding: 0.375rem 0.75rem;
}

.term-mode {
  background: var(--accent);
  color: var(--bg);
  font-weight: 500;
}

.term-path {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--fg);
}

@media (width >= 64rem) {
  .term {
    top: var(--header-h);
    bottom: auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 3rem;
    align-self: start;
    height: calc(100dvh - var(--header-h));
    border-right: 1px solid var(--line);
    background: var(--bg);
  }

  .term-window {
    height: 100%;
    border-right: 1px solid var(--line);
  }

  .term-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.75rem;
  }

  .term-dots {
    display: flex;
    gap: 0.375rem;
  }

  .term-dots span {
    width: 0.625rem;
    height: 0.625rem;
    border: 1px solid var(--line);
    border-radius: 50%;
  }

  .term-dots span:first-child {
    border-color: var(--accent);
    background: var(--accent);
  }

  .term-screen {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.25rem;
    min-height: 0;
    padding: 1.25rem 1rem;
  }

  .term-gutter {
    display: block;
    position: relative;
    overflow: hidden;
    color: var(--muted);
    font-size: 0.6875rem;
    text-align: right;
  }
}

.term-line {
  margin: 0;
  color: var(--fg);
  white-space: nowrap;
}

.term-line--muted {
  margin-top: 1.5rem;
  color: var(--muted);
}

.term-prompt {
  color: var(--accent);
}

.term-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--accent);
}

.term-current {
  margin: 1rem 0 0;
  overflow-wrap: anywhere;
  font-family: var(--font-display);
  font-size: clamp(2rem, 2.6vw, 2.75rem);
  line-height: 1;
}

.term-list {
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
}

.term-link {
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;
  margin-inline: -0.5rem;
  border-radius: 2px;
  color: var(--muted);
  text-decoration: none;
}

.term-link:hover {
  color: var(--fg);
}

.term-link[aria-current="true"] {
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  color: var(--fg);
}

.term-link[aria-current="true"]::before {
  content: ">";
  margin-left: -0.625rem;
  color: var(--accent);
}

.term-index {
  color: var(--accent);
}

.term-link[aria-current="true"] .term-index {
  color: var(--fg);
}

.term-progress-fill {
  color: var(--accent);
}

.term-progress {
  margin: auto 0 0;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

/* Numbers come from a CSS counter: decorative, so no text in the DOM. */
.term-gutter-track {
  display: flex;
  flex-direction: column;
  counter-reset: line;
}

.term-gutter-line::before {
  content: counter(line);
  counter-increment: line;
}

.term-gutter-line {
  display: block;
  height: 1.5rem;
  padding-right: 0.5rem;
  line-height: 1.5rem;
}

.term-gutter-line:nth-child(5n) {
  color: var(--fg);
}

/* Fixed cursor in the middle of the gutter, like the ruler's marker. */
.term-cursor {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  padding-right: 0.5rem;
  height: calc(1.5rem + 2px);
  border-block: 1px solid var(--accent);
  background: var(--bg);
  color: var(--accent);
  line-height: 1.5rem;
  transform: translateY(-50%);
}

@media (prefers-reduced-motion: no-preference) {
  .term-caret {
    /* Stops after a few seconds (WCAG 2.2.2). */
    animation: blink 1s steps(1) 5;
  }

  .term-link {
    transition:
      background 0.2s ease,
      color 0.2s ease;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
