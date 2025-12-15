<template>
  <div class="skeleton-card">
    <div class="poster"></div>
    <div class="line title"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.skeleton-card {
  border-radius: 10px;
  overflow: hidden;
}
.poster {
  height: 220px;
  background: linear-gradient(
    90deg,
    #2a2a2a 25%,
    #3a3a3a 37%,
    #2a2a2a 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
.line {
  height: 12px;
  margin: 8px 10px;
  border-radius: 4px;
  background: #333;
}
.title { width: 70%; }

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
</style>
