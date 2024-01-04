<script setup lang="ts">
import AssignmentList from '../components/AssignmentList.vue'
import { computed, ref } from 'vue'
import type { AssignmentType } from '@/components/assignment'
import AssignmentCreate from '@/components/AssignmentCreate.vue'

const assignments = ref<AssignmentType[]>([
  {
    name: 'Finished project',
    complete: false,
    id: 1
  },
  {
    name: 'Read chapter 4',
    complete: false,
    id: 2
  },
  {
    name: 'Turn in Homework',
    complete: false,
    id: 3
  }
])

const add = (name: string) => {
  assignments.value.push({
    name,
    complete: false,
    id: assignments.value.length + 1
  })
}

const filters = () =>
  computed(() => {
    return {
      inProgress: assignments.value.filter((a) => !a.complete),
      completed: assignments.value.filter((a) => a.complete)
    }
  })
</script>

<template>
  <div class="h-full flex flex-col justify-center space-y-6">
    <AssignmentList :assignments="filters().value.inProgress" title="In Progress" />

    <AssignmentList :assignments="filters().value.completed" title="Completed" />

    <AssignmentCreate @add="add" />
  </div>
</template>

<style scoped></style>
