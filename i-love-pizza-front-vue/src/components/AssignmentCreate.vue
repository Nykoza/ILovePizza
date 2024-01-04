<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['add'])

const newAssignment = ref('')

const add = () => {
  emit('add', newAssignment.value)
  newAssignment.value = ''
}
</script>

<template>
  <form @submit.prevent="add">
    <div class="border border-gray-600">
      <input
        type="text"
        v-model="newAssignment"
        placeholder="New assignment..."
        class="text-black p-2"
      />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add</button>
    </div>
  </form>
</template>

<style scoped></style>
