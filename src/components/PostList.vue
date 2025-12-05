<template>
  <div class="post-list pixel-border">
    <div class="header">
      <h2 class="title glow-text">$ cat diary.log</h2>
      <div class="post-count">
        [ {{ posts.length }} entries ]
      </div>
    </div>

    <div class="posts-container">
      <div
        v-for="post in posts"
        :key="post.id"
        class="post-item"
        @click="$emit('select-post', post)"
      >
        <div class="post-date">
          <span class="bracket">[</span>
          <span class="date-text">{{ formatDate(post.date) }}</span>
          <span class="bracket">]</span>
        </div>
        <h3 class="post-title">
          <span class="prompt">&gt;</span> {{ post.title }}
        </h3>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})

defineEmits(['select-post'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
.post-list {
  width: 350px;
  background-color: rgba(15, 15, 35, 0.9);
  padding: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  position: sticky;
  top: 20px;
}

.header {
  margin-bottom: 20px;
  border-bottom: 2px solid var(--retro-primary);
  padding-bottom: 15px;
}

.title {
  font-size: 14px;
  color: var(--retro-primary);
  margin-bottom: 10px;
}

.post-count {
  font-size: 10px;
  color: var(--retro-accent);
  text-align: right;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post-item {
  padding: 15px;
  border: 2px solid var(--retro-primary);
  background-color: rgba(0, 255, 65, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-item:hover {
  background-color: rgba(0, 255, 65, 0.15);
  transform: translateX(5px);
  box-shadow: 0 0 15px var(--retro-primary);
}

.post-date {
  font-size: 9px;
  color: var(--retro-text);
  margin-bottom: 8px;
}

.bracket {
  color: var(--retro-accent);
}

.date-text {
  color: var(--retro-secondary);
  margin: 0 5px;
}

.post-title {
  font-size: 11px;
  color: var(--retro-primary);
  margin-bottom: 10px;
  line-height: 1.6;
}

.prompt {
  color: var(--retro-accent);
  margin-right: 5px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 8px;
  color: var(--retro-secondary);
  border: 1px solid var(--retro-secondary);
  padding: 3px 8px;
  background-color: rgba(255, 0, 255, 0.1);
}

@media (max-width: 768px) {
  .post-list {
    width: 100%;
    position: relative;
    top: 0;
  }
}
</style>
