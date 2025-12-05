<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <div v-if="!selectedPost" class="content-wrapper">
        <PostList :posts="posts" @select-post="selectPost" />
      </div>
      <div v-else class="post-view">
        <button class="back-button" @click="selectedPost = null">
          ← Voltar para posts
        </button>
        <Post :post="selectedPost" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import PostList from './components/PostList.vue'
import Post from './components/Post.vue'
import postsData from './data/posts.json'

const posts = ref([])
const selectedPost = ref(null)

onMounted(() => {
  posts.value = postsData
})

const selectPost = (post) => {
  selectedPost.value = post
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--primary-bg);
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 48px;
}

.post-view {
  width: 100%;
  min-height: 100vh;
  background-color: var(--primary-bg);
}

.back-button {
  position: fixed;
  top: 32px;
  left: calc(var(--sidebar-width) + 48px);
  background-color: var(--primary-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background-color: var(--secondary-bg);
  border-color: var(--text-secondary);
  transform: translateX(-2px);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }

  .content-wrapper {
    padding: 48px 24px;
  }

  .back-button {
    left: 24px;
    top: 24px;
    font-size: 13px;
    padding: 10px 20px;
  }
}
</style>
