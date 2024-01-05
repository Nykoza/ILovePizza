<script setup lang="ts">
import AssignmentList from '@/components/AssignmentList.vue'
import { computed, onBeforeMount, ref } from 'vue'
import type { AssignmentType } from '@/models/assignment'
import AssignmentCreate from '@/components/AssignmentCreate.vue'

let assignments = ref<AssignmentType[]>([])

onBeforeMount(() => {
  fetch('http://localhost:3333/pizzaorders')
    .then((res) => res.json())
    .then((data) => {
      assignments.value = data
    })
    .catch((err) => console.error(err))
})

const add = (name: string) => {
  assignments.value.push({
    name,
    complete: false,
    id: assignments.value.length + 1,
    tag: 'science'
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
