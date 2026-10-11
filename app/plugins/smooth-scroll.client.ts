import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Inertial smooth scrolling, as on getartcraft.com. Native scrolling is kept
// when the visitor asks for reduced motion.
export default defineNuxtPlugin(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const lenis = reducedMotion ? null : new Lenis({ lerp: 0.12, autoRaf: true });
  return { provide: { lenis } };
});
