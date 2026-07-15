<script setup lang="ts"></script>
<template>
  <article class="skeleton-card">
    <div class="skeleton skeleton-image"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-price"></div>
  </article>
</template>

<style scoped>
.skeleton-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  height: 100%;
}

.skeleton {
  background: var(--color-border);
  border-radius: var(--radius);
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-image {
  width: 100%;
  height: 200px;
}

.skeleton-title {
  height: 1rem;
  width: 80%;
}

.skeleton-price {
  height: 1.5rem;
  width: 40%;
  margin-top: auto;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>