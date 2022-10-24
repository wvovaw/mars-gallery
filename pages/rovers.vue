<script setup>
const { data } = await useFetch(`${useRuntimeConfig().apiBase}/rovers`, {
  params: {
    api_key: useRuntimeConfig().apiKey,
  },
});
const rovers = data._rawValue.rovers;
rovers[0].photo =
  "https://d2pn8kiwq2w21t.cloudfront.net/images/28-mission-current-MSL-Curiosity-alt.height-700.png"; // Cur
rovers[1].photo =
  "https://www.pngall.com/wp-content/uploads/5/Mars-Rover-PNG-Transparent-HD-Photo.png"; // Spirit
rovers[2].photo =
  "https://www.pngall.com/wp-content/uploads/5/Mars-Rover-PNG-Transparent-HD-Photo.png"; // Oppo
rovers[3].photo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Perseverance_rover_design.png/1200px-Perseverance_rover_design.png";
</script>

<template>
  <div
    class="md:flex md:flex-row md:flex-wrap md:gap-4 m-4 place-content-center"
  >
    <RoverCard v-for="rover in rovers" :key="rover.id" :rover="rover" />
  </div>
</template>

<style scoped></style>
