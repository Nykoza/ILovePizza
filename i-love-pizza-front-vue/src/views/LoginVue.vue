<script setup lang="ts">
import type { Auth } from '@/models/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUnsecuredFetch } from '@/hooks/useUnsecuredFetch'
import type { LoginResponse } from '@/models/login'

const router = useRouter()

const credentials = ref<Auth>({
  email: '',
  password: ''
})

const login = () => {
  useUnsecuredFetch<Auth>('/auth/signin', credentials.value)
    .then((res) => res.json())
    .then((data: LoginResponse) => {
      if (!data.access_token) throw new Error('No access token')
      localStorage.setItem('token', data.access_token)
      router.push({ name: 'home' })
    })
    .catch((err) => console.error(err))
}
</script>

<template>
  <form @submit.prevent="login" class="flex flex-col gap-3">
    <input v-model="credentials.email" class="text-black p-1" />
    <input v-model="credentials.password" type="password" class="text-black p-1" />

    <button type="submit">Login</button>
  </form>
</template>

<style scoped></style>
