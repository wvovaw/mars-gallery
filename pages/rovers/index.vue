<script setup>
const rovers = await $fetch("/api/roversList");
</script>

<template>
  <div
    class="md:flex md:flex-row md:flex-wrap md:gap-4 m-4 place-content-center"
  >
    <RoverCard v-for="rover in rovers" :key="rover.id" :rover="rover" />
  </div>
</template>

<style scoped></style>
