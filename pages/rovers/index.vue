<script setup>
const rovers = await $fetch("/api/roversList");
</script>

<template>
  <div
    class="md:flex md:flex-row md:flex-wrap md:gap-4 m-4 place-content-center"
  >
    <RoverCard :rover="rovers[0]" />
    <RoverCard :rover="rovers[1]" />
    <RoverCard :rover="rovers[2]" />
    <RoverCard :rover="rovers[3]" />
  </div>
</template>

<style scoped></style>
