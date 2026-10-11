<script setup lang="ts">
const { endpoint } = defineProps<{ endpoint: string }>();
const { t } = useI18n();

const state = ref<"idle" | "sending" | "success" | "error">("idle");

// Without JS the form posts natively to the endpoint; with JS we stay on the page.
async function onSubmit(event: Event) {
  const form = event.target as HTMLFormElement;
  state.value = "sending";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(String(response.status));
    form.reset();
    state.value = "success";
  } catch {
    state.value = "error";
  }
}
</script>

<template>
  <form
    v-reveal
    class="contact-form"
    :action="endpoint"
    method="POST"
    @submit.prevent="onSubmit"
  >
    <label class="field" for="contact-name">
      <span class="field-label">{{ t("contact.form.name") }}</span>
      <input
        id="contact-name"
        name="name"
        type="text"
        autocomplete="name"
        required
      />
    </label>
    <label class="field" for="contact-email">
      <span class="field-label">{{ t("contact.form.email") }}</span>
      <input
        id="contact-email"
        name="email"
        type="email"
        autocomplete="email"
        required
      />
    </label>
    <label class="field" for="contact-message">
      <span class="field-label">{{ t("contact.form.message") }}</span>
      <textarea id="contact-message" name="message" rows="5" required />
    </label>
    <!-- Honeypot: hidden from people, filled by bots. -->
    <input
      type="text"
      name="_gotcha"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="honeypot"
    />
    <button type="submit" class="button" :disabled="state === 'sending'">
      {{
        state === "sending"
          ? t("contact.form.sending")
          : t("contact.form.submit")
      }}
    </button>
    <p class="form-status" role="status" aria-live="polite">
      <template v-if="state === 'success'">{{
        t("contact.form.success")
      }}</template>
      <template v-else-if="state === 'error'">{{
        t("contact.form.error")
      }}</template>
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: 1rem;
  max-width: 32rem;
  margin-bottom: 2rem;
}

.field {
  display: grid;
  gap: 0.375rem;
}

.field-label {
  color: var(--muted);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}

input,
textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 2px;
  background: transparent;
  color: var(--fg);
  font: inherit;
  resize: vertical;
}

input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.honeypot {
  position: absolute;
  left: -9999px;
}

.contact-form .button {
  justify-self: start;
}

.button:disabled {
  opacity: 0.6;
  cursor: progress;
}

.form-status {
  min-height: 1.5em;
  margin: 0;
  color: var(--muted);
  font-size: 0.9375rem;
}
</style>
