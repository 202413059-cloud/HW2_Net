<script setup lang="ts">
</script>

<template>
  <header class="header">
    <h1 class="logo">NETFLIX DEMO</h1>

    <nav>
      <a href="/">Home</a>
      <a href="/popular">Popular</a>
      <a href="/search">Search</a>
      <a href="/wishlist">Wishlist</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: black;
  color: white;
}

nav a {
  margin-left: 12px;
  color: white;
  text-decoration: none;
}
</style>
