<script setup>
const { data } = await useFetch(`${useRuntimeConfig().apiBase}/rovers/spirit`, {
  params: {
    api_key: useRuntimeConfig().apiKey,
  },
});
const spirit = data._rawValue.rover;
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      {{ spirit }}
      <label for="drawer" class="btn btn-primary drawer-button lg:hidden"
        >Open drawer</label
      >
    </div>
    <div class="drawer-side bg-base-200">
      <label for="drawer" class="drawer-overlay"></label>
      <ul class="p-4 overflow-y-scroll w-80 text-base-content">
        <label v-for="camera in spirit.cameras" class="cursor-pointer label">
          <input type="checkbox" checked="checked" class="checkbox" />
          <span class="label-text">{{ camera.name }}</span>
        </label>
      </ul>
      <div class="controls p-4">
        <input
          type="range"
          min="0"
          :max="spirit.max_sol"
          value="0"
          class="range range-secondary"
        />
        <button class="btn btn-primary">Apply filter</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
