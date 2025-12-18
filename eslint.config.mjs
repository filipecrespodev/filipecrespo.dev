// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import vueA11y from "eslint-plugin-vuejs-accessibility";

export default withNuxt({
  plugins: {
    "vuejs-accessibility": vueA11y,
  },
  rules: {
    ...vueA11y.configs.recommended.rules,
  },
});
