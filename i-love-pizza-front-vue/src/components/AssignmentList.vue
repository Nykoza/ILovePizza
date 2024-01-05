<script setup lang="ts">
import type { AssignmentType } from '@/models/assignment'
import Assignment from '@/components/AnAssignment.vue'
import { computed, ref } from 'vue'
import AssignmentTags from '@/components/AssignmentTags.vue'

interface Props {
  assignments: AssignmentType[]
  title: string
}

const props = defineProps<Props>()

const currentTag = ref('all')

const filteredAssignment = computed(() => {
  if (currentTag.value === 'all') return props.assignments

  return props.assignments.filter((a) => a.tag === currentTag.value)
})

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

    <AssignmentTags v-model:currentTag="currentTag" :tags="assignments.map((a) => a.tag)" />

    <ul class="mt-6">
      <Assignment
        :key="assignment.id"
        :assignment="assignment"
        v-for="assignment in filteredAssignment"
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
