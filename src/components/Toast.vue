<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const visible = ref(false)
const message = ref('')

function show(msg: string, duration = 2000) {
  message.value = msg
  visible.value = true

  setTimeout(() => {
    visible.value = false
  }, duration)
}

// 부모에서 show() 호출 가능하게 노출
defineExpose({ show })
</script>

<template>
  <div v-if="visible" class="toast">
    {{ message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  animation: fadeInOut 0.3s ease;
}

@keyframes fadeInOut {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>

