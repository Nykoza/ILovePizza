<script setup lang="ts">
import type { AssignmentType } from '@/models/assignment'

const emit = defineEmits(['setComplete'])
interface Props {
  assignment: AssignmentType
}

const props = defineProps<Props>()

const setComplete = () => {
  emit('setComplete', props.assignment)
}
</script>

<template>
  <li :key="assignment.id">
    <label class="p-2 flex justify-between items-center">
      {{ assignment.name }}

      <input type="checkbox" :checked="assignment.complete" @click="setComplete" class="ml-3" />
    </label>
  </li>
</template>

<style scoped></style>
