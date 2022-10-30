<script setup>
const props = defineProps({
  rover: {
    type: Object,
    required: true,
  },
});
const formatedDate = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString().slice(3);
};
</script>

<template>
  <div class="card md:w-auto my-4 bg-base-100 shadow-xl">
    <figure>
      <img
        :src="rover.photo"
        :alt="rover.name + 'photo'"
        class="object-cover w-96"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <NuxtLink class="link link-hover" :to="`/rovers/${rover.name}`">
          {{ rover.name }}
        </NuxtLink>
        <div
          class="badge"
          :class="{
            'badge-error': rover.status == 'complete',
            'badge-success': rover.status == 'active',
          }"
        >
          {{ rover.status }}
        </div>
      </h2>
      <div class="w-auto md:w-96 card-actions justify-start">
        <div
          class="badge badge-outline"
          v-for="camera in rover.cameras"
          :key="camera.id"
        >
          <div class="tooltip" :data-tip="camera.full_name">
            {{ camera.name }}
          </div>
        </div>
      </div>
      <div class="stats stats-vertical md:stats-horizontal">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <Icon name="ion:image" size="2rem" />
          </div>
          <div class="stat-title">Total photos</div>
          <div class="stat-value">{{ rover.total_photos }}</div>
          <div class="stat-desc">
            {{ formatedDate(rover.landing_date) }}
            -
            {{ formatedDate(rover.max_date) }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <Icon name="ion:sunny" size="2rem" />
          </div>
          <div class="stat-title">Sols<abbr> (Mars days)</abbr></div>
          <div class="stat-value">{{ rover.max_sol }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
