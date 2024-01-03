<script setup lang="ts">
import type { AssignmentType } from '@/components/assignment'

interface Props {
  assignments: AssignmentType[]
  title: string
}

defineProps<Props>()
</script>

<template>
  <section v-show="assignments.length" class="border-2 rounded border-gray-700 border-solid p-2">
    <h2>{{ title }}</h2>

    <ul>
      <li :key="assignment.id" v-for="assignment in assignments">
        <label class="p-2 flex justify-between items-center">
          {{ assignment.name }}

          <input type="checkbox" v-model="assignment.complete" class="ml-3" />
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 700;
  padding-bottom: 16px;
}
</style>
