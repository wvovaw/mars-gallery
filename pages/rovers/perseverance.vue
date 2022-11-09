<script setup lang="ts">
definePageMeta({ layout: false });
const roverName = "perseverance";

// Data
// - Remote data
const rover = (await $fetch(`/api/roversList`))[0];
let data = ref<Record<string, any>>({ images: [] });

// - Filters
const fromSol = ref<Number | undefined>(undefined);
const toSol = ref<Number | undefined>(undefined);
const showLatest = ref<boolean>(false);
const selectedCameras = ref<string[]>([]);
const sortType = ref<string>("desc");
const itemsPerPage = ref<number>(50);
const selectedPage = ref<number>(0);

// - Other vars
const selectedPhoto = ref<String>("");

// Methods
const removeFilters = async () => {};

const getPhotos = async () => {
  const url =
    `/api/perseverance?` +
    new URLSearchParams({
      order: `sol+${sortType.value}`,
      condition_2: fromSol.value != undefined ? `${fromSol.value}:sol:gte` : "",
      condition_3: fromSol.value != undefined ? `${toSol.value}:sol:lte` : "",
      num: itemsPerPage.value,
      page: selectedPage.value,
      search: selectedCameras.value.join("|"),
    }).toString();

  data.value = await $fetch(url);
};
const nextPage = () => {
  if (selectedPage.value < numOfPages.value) selectedPage.value++;
};
const prevPage = () => {
  if (selectedPage.value > 0) selectedPage.value--;
};

// Computed
const photosLinks = computed(() =>
  data.value.images.map((item) => item.image_files.full_res)
);
const totalResults = computed(() => data.value.total_results);
const numOfPages = computed(() =>
  Math.ceil(Number(data.value.total_results) / Number(data.value.per_page))
);
const filtersList = computed(() => ["FHAZ", "RHAZ", "SHERLOCK"]);

// Watch
const stopUpdates = watchEffect(() => {
  console.group("Fliters");
  console.log("Show latest: ", showLatest.value);
  console.log("fromSol: ", fromSol.value);
  console.log("toSol: ", toSol.value);
  console.log("Cameras:  ", selectedCameras.value);
  console.log("sortType:  ", sortType.value);
  console.log("itemsPerPage:  ", itemsPerPage.value);
  console.log("selectedPage:  ", selectedPage.value);
  console.groupEnd();
  getPhotos();
});

// Lifecycle hooks
onBeforeMount(() => {
  getPhotos();
});
</script>

<template>
  <NuxtLayout name="galery">
    <template #filters>
      <div class="container pl-4">
        <div class="filters__badges">
          <label class="label"
            >Filters:
            <div class="ml-2 badges flex flex-row flex-wrap gap-2">
              <div
                v-for="item in filtersList"
                :key="item"
                class="badge badge-outline badge-sm"
              >
                <Icon name="ion:close-sharp" size="1rem" />
                {{ item }}
              </div>
            </div>
          </label>
        </div>
      </div>
      <div class="divider m-0"></div>
      <div class="pagination flex justify-between">
        <label class="label py-0 px-4">
          Showing {{ itemsPerPage * selectedPage + 1 }}-{{
            (selectedPage + 1) * itemsPerPage
          }}
          of {{ totalResults }} results
        </label>
        <div class="form-control flex flex-row pr-2">
          <button
            @click="prevPage"
            class="btn btn-xs btn-circle btn-outline no-animation"
          >
            <Icon name="ion:chevron-back-sharp" size="1rem" />
          </button>

          <label class="input-group input-group-xs max-w-fit px-2">
            <input
              type="number"
              min="0"
              :max="numOfPages"
              v-model.number="selectedPage"
              class="input input-secondary input-bordered input-xs w-20"
            />
            <span> of {{ numOfPages }} </span>
          </label>
          <button
            @click="nextPage"
            class="btn btn-xs btn-circle btn-outline no-animation"
          >
            <Icon name="ion:chevron-forward-sharp" size="1rem" />
          </button>
        </div>
      </div>
    </template>
    <template #drawer>
      <aside class="bg-base-200 w-80">
        <div class="input-group-xs p-4">
          <label class="label">
            <span class="label-text">Sort by sol</span>
            <select
              name="sort"
              class="select select-secondary select-sm"
              v-model="sortType"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          <label class="cursor-pointer label">
            <span class="label-text">Show latest</span>
            <input
              type="checkbox"
              class="toggle toggle-secondary"
              :checked="showLatest"
              @change="
                showLatest = showLatest == true ? false : true;
                fromSol = undefined;
                toSol = undefined;
              "
            />
          </label>
        </div>
        <label class="label px-4">
          <span class="label-text text-lg">Select sol</span>
        </label>
        <div class="input-group-xs p-4">
          <label class="label">
            <span class="label-text-alt">From </span>
            <input
              type="number"
              min="0"
              :max="rover.max_sol"
              v-model.number="fromSol"
              class="input input-secondary input-bordered input-xs"
              :disabled="showLatest"
            />
          </label>
          <label class="label">
            <span class="label-text-alt">To </span>
            <input
              type="number"
              min="0"
              :max="rover.max_sol"
              v-model.number="toSol"
              class="input input-secondary input-bordered input-xs"
              :disabled="showLatest"
            />
          </label>
        </div>
        <label class="label px-4">
          <span class="label-text text-lg">Cameras</span>
        </label>
        <ul class="p-4 overflow-y-scroll w-80 text-base-content">
          <label
            v-for="(value, key) in rover.cameras"
            class="cursor-pointer label"
          >
            <input
              type="checkbox"
              name="camera"
              class="checkbox checkbox-secondary checkbox-sm"
              :value="value['filter']"
              v-model="selectedCameras"
            />
            <span class="label-text">{{ value["name"] }}</span>
          </label>
        </ul>
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
              <h3 class="font-bold">No photos was found.</h3>
              <div class="text-xs">
                Try to set another sol and camera filters.
              </div>
            </div>
          </div>
          <div class="flex-none">
            <button
              class="btn btn-sm btn-secondary"
              @click.stop="removeFilters"
            >
              Remove filters
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
