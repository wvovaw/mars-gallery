<script setup lang="ts">
definePageMeta({ layout: false });
const roverName = new String(useRoute().params.rover).toLowerCase();
const rover = await $fetch(`/api/${roverName}/info`);

const selectedSol = ref<Number>(0);
const selectedCamera = ref<String>("");
const selectedPhoto = ref<String>("");

let photos = ref([]);

async function getLatestPhotos() {
  photos.value = await $fetch(`/api/${roverName}/latest`);
}

async function getPhotos() {
  photos.value = await $fetch(
    `/api/${roverName}/photos?camera=${selectedCamera.value}&sol=${selectedSol.value}`
  );
}

const photosLinks = computed(() =>
  photos.value.map((item) => {
    return item.img_src;
  })
);
onBeforeMount(() => {
  getLatestPhotos();
});
</script>

<template>
  <NuxtLayout name="galery">
    <template #drawer>
      <aside class="bg-base-200 w-80">
        <div class="controls p-4">
          <label class="label">
            <span class="label-text">Select sol</span>
            <span class="label-text-alt">Max {{ rover.max_sol }}</span>
          </label>
          <div class="tooltip" :data-tip="selectedSol">
            <input
              id="sol"
              type="range"
              min="0"
              :max="rover.max_sol"
              v-model="selectedSol"
              class="range range-primary"
            />
          </div>
          <input
            type="number"
            v-model="selectedSol"
            class="input input-primary"
          />
        </div>
        <ul class="p-4 overflow-y-scroll w-80 text-base-content">
          <label class="cursor-pointer label">
            <input
              type="radio"
              name="camera"
              class="radio radio-xs"
              value=""
              v-model="selectedCamera"
            />
            <span class="label-text">All</span>
          </label>
          <label v-for="camera in rover.cameras" class="cursor-pointer label">
            <input
              type="radio"
              name="camera"
              class="radio radio-xs"
              :value="camera.name"
              v-model="selectedCamera"
            />
            <span class="label-text">{{ camera.name }}</span>
          </label>
        </ul>
        <div class="px-4 flex row-auto justify-between">
          <button class="btn btn-primary btn-xl" @click.stop="getPhotos">
            Apply filter
          </button>
          <button
            class="btn btn-secondary btn-xl"
            @click.stop="getLatestPhotos"
          >
            Show latest
          </button>
        </div>
      </aside>
    </template>
    <template #content>
      <div
        v-if="photosLinks.length == 0"
        class="drawer-content flex items-center justify-center"
      >
        <div class="alert alert-warning shadow-lg m-5 p-5">
          <div>
            <Icon name="ion:information-circle-outline" size="1em" />
            <div>
              <h3 class="font-bold">
                No photos was taken at sol {{ selectedSol }} on selected camera.
              </h3>
              <div class="text-xs">Try to choose another sol or camera.</div>
            </div>
          </div>
          <div class="flex-none">
            <button
              class="btn btn-sm btn-secondary"
              @click.stop="getLatestPhotos"
            >
              Show latest
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="drawer-content grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center justify-center"
      >
        <figure
          v-for="photo in photosLinks"
          :key="photo"
          class="p-3 rounded-xl shadow-xl grid justify-center"
          @click="selectedPhoto = photo"
        >
          <img
            :src="photo"
            alt="Secret UFO photo"
            class="rounded-xl"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
      <input type="checkbox" id="fullscreen-img-modal" class="modal-toggle" />
      <div
        class="modal modal-middle"
        :class="{ 'modal-open': selectedPhoto.length > 0 }"
        @click="selectedPhoto = ''"
      >
        <div class="modal-box p-0">
          <figure class="grid justify-center">
            <img :src="selectedPhoto" alt="Secret UFO photo" />
          </figure>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
