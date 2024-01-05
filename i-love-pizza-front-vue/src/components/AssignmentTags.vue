<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['change'])

interface Props {
  tags: string[]
  currentTag: string
}

const props = defineProps<Props>()

const allTags = computed(() => {
  console.log(props.tags)
  return ['all', ...new Set(props.tags.map((a) => a))]
})
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="emit('change', tag)"
      :key="tag"
      v-for="tag in allTags"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded text-xs"
      :class="{ 'bg-blue-700': currentTag === tag }"
    >
      {{ tag }}
    </button>
  </div>
</template>

<style scoped></style>
