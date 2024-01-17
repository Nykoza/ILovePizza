<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useGetSecuredFetch } from '@/hooks/useSecuredFetch'
import type { PizzaOrder } from '@/models/pizza'
import PizzaOrders from '@/components/PizzaOrders.vue'

const _pizzaOrders = ref<PizzaOrder[]>([])

onBeforeMount(() => {
  useGetSecuredFetch('/pizzaorders')
    .then((res) => res.json())
    .then((data) => {
      _pizzaOrders.value = data
    })
    .catch((err) => console.error(err))
})
</script>

<template>
  <PizzaOrders :pizzaOrders="_pizzaOrders" />
</template>

<style scoped></style>
