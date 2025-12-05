<template>
  <div class="app-container scanline">
    <Sidebar />
    <main class="main-content">
      <PostList :posts="posts" @select-post="selectPost" />
      <Post v-if="selectedPost" :post="selectedPost" />
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
  if (posts.value.length > 0) {
    selectedPost.value = posts.value[0]
  }
})

const selectPost = (post) => {
  selectedPost.value = post
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--retro-bg);
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: var(--sidebar-width);
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    flex-direction: column;
  }
}
</style>
