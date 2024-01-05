<script setup lang="ts">
import type { AssignmentType } from '@/models/assignment'
import { ref } from 'vue'
import Assignment from '@/components/AnAssignment.vue'

interface Props {
  assignments: AssignmentType[]
  title: string
}

const tags = ref(['science', 'math', 'reading'])

const props = defineProps<Props>()

const setComplete = (assignment: AssignmentType) => {
  const assignmentToChange = props.assignments.find((a) => a.id === assignment.id)
  if (!assignmentToChange) return

  assignmentToChange.complete = !assignmentToChange.complete
}
</script>

<template>
  <section v-show="assignments.length" class="border-2 rounded border-gray-700 border-solid p-2">
    <h2>
      {{ title }}
      <span> ({{ assignments.length }}) </span>
    </h2>

    <div class="flex gap-2">
      <button
        :key="tag"
        v-for="tag in tags"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded text-xs"
      >
        {{ tag }}
      </button>
    </div>

    <ul class="mt-6">
      <Assignment
        :key="assignment.id"
        :assignment="assignment"
        v-for="assignment in assignments"
        @setComplete="setComplete"
      />
    </ul>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 700;
  padding-bottom: 16px;
}
</style>
