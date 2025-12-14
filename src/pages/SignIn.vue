<template>
  <div class="signin">
    <div :class="['card', mode]">
      <h2>{{ mode === 'login' ? 'Login' : 'Register' }}</h2>

      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />

      <input
        v-if="mode === 'register'"
        type="password"
        v-model="confirm"
        placeholder="Confirm Password"
      />

      <label v-if="mode === 'register'">
        <input type="checkbox" v-model="agree" /> 약관 동의
      </label>

      <button @click="submit">
        {{ mode === 'login' ? 'Login' : 'Register' }}
      </button>

      <p @click="toggle">
        {{ mode === 'login' ? '회원가입' : '로그인' }}으로 전환
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const confirm = ref('')
const agree = ref(false)

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

function submit() {
  if (!isValidEmail(email.value)) {
    alert('이메일 형식이 아닙니다')
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  if (mode.value === 'register') {
    if (password.value !== confirm.value || !agree.value) {
      alert('회원가입 정보 오류')
      return
    }
    users.push({ id: email.value, password: password.value })
    localStorage.setItem('users', JSON.stringify(users))
    alert('회원가입 성공')
    mode.value = 'login'
    return
  }

  const user = users.find(
    (u: any) => u.id === email.value && u.password === password.value
  )

  if (!user) {
    alert('로그인 실패')
    return
  }

  localStorage.setItem('auth', JSON.stringify({ email: user.id }))
  localStorage.setItem('TMDb-Key', user.password)

  router.push('/')
}

function toggle() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}
</script>

<style scoped>
.card {
  transition: all 0.4s ease;
}
.card.register {
  transform: translateX(10px);
}
</style>

