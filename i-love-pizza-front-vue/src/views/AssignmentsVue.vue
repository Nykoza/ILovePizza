<script setup lang="ts">
import AssignmentList from '../components/AssignmentList.vue'
import { computed, ref } from 'vue'
import type { AssignmentType } from '@/components/assignment'

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

    <form>
      <div class="border border-gray-600">
        <input type="text" placeholder="New assignment..." class="text-black" />
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
