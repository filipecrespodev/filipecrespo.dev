import type { Directive } from "vue";

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

const reveal: Directive<HTMLElement> = {
  getSSRProps: () => ({}),
  mounted(el) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    // Already on screen at load: leave it visible instead of hiding and re-showing.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-visible");
          observer.disconnect();
          observers.delete(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    observers.set(el, observer);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", reveal);
});
