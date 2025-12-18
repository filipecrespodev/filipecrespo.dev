// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import vueA11y from "eslint-plugin-vuejs-accessibility";

export default withNuxt({
  plugins: {
    "vuejs-accessibility": vueA11y,
  },
  rules: {
    ...vueA11y.configs.recommended.rules,
    // Allow self-closing on HTML void elements (compatible with Prettier)
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          void: "always",
        },
      },
    ],
  },
});
