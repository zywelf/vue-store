<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1>Store</h1>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.main {
  max-width: 87.5rem; /* 1400px */
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}
</style>
