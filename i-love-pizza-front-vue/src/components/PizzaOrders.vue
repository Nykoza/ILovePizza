<script setup lang="ts">
import type { PizzaOrder } from '@/models/pizza'

interface Props {
  pizzaOrders: PizzaOrder[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <h1>Pizza Orders</h1>

    <ul>
      <li v-for="pizzaOrder in pizzaOrders" :key="pizzaOrder.id">
        {{ pizzaOrder.name }}
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
