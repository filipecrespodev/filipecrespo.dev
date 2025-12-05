<template>
  <article class="post-viewer pixel-border">
    <header class="post-header">
      <div class="terminal-line">
        <span class="prompt">filipecrespo@dev:~$</span>
        <span class="command">cat {{ post.title }}.txt</span>
        <span class="cursor blink">_</span>
      </div>

      <div class="post-meta">
        <div class="meta-item">
          <span class="meta-label">DATE:</span>
          <span class="meta-value">{{ formatDate(post.date) }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">ID:</span>
          <span class="meta-value">#{{ post.id }}</span>
        </div>
      </div>
    </header>

    <div class="divider-post"></div>

    <h1 class="post-title-main glow-text">{{ post.title }}</h1>

    <div class="post-tags-main">
      <span v-for="tag in post.tags" :key="tag" class="tag-main">
        #{{ tag }}
      </span>
    </div>

    <div class="divider-post"></div>

    <div class="post-content">
      <p v-for="(paragraph, index) in post.content" :key="index" class="paragraph">
        {{ paragraph }}
      </p>
    </div>

    <div class="divider-post"></div>

    <footer class="post-footer">
      <div class="footer-text">
        <span class="prompt">&gt;</span> End of transmission
        <span class="blink">█</span>
      </div>
    </footer>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-viewer {
  flex: 1;
  background-color: rgba(15, 15, 35, 0.9);
  padding: 30px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.post-header {
  margin-bottom: 20px;
}

.terminal-line {
  font-size: 11px;
  color: var(--retro-primary);
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(0, 255, 65, 0.1);
  border-left: 3px solid var(--retro-primary);
}

.prompt {
  color: var(--retro-accent);
  margin-right: 10px;
}

.command {
  color: var(--retro-primary);
  margin-right: 5px;
}

.cursor {
  color: var(--retro-primary);
}

.post-meta {
  display: flex;
  gap: 20px;
  font-size: 10px;
}

.meta-item {
  display: flex;
  gap: 10px;
}

.meta-label {
  color: var(--retro-text);
}

.meta-value {
  color: var(--retro-secondary);
  text-shadow: 0 0 5px var(--retro-secondary);
}

.divider-post {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--retro-primary),
    transparent
  );
  margin: 20px 0;
}

.post-title-main {
  font-size: 20px;
  color: var(--retro-primary);
  margin-bottom: 15px;
  line-height: 1.6;
}

.post-tags-main {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tag-main {
  font-size: 9px;
  color: var(--retro-secondary);
  border: 2px solid var(--retro-secondary);
  padding: 5px 12px;
  background-color: rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}

.post-content {
  line-height: 2.2;
  font-size: 11px;
  color: var(--retro-text);
}

.paragraph {
  margin-bottom: 20px;
  text-align: justify;
}

.post-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid var(--retro-primary);
}

.footer-text {
  font-size: 11px;
  color: var(--retro-accent);
  text-align: center;
}

@media (max-width: 768px) {
  .post-viewer {
    padding: 20px;
  }

  .post-title-main {
    font-size: 16px;
  }
}
</style>
