<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { RoverApiFilters, RoverApiPagination } from "@/lib/types";
import { getRoverPhotos } from "~/lib/photosQuery";

/**
 * Variables
 */

const roverName = (useRoute().params.rover as string).toLowerCase();
const isActiveRover = !["spirit", "opportunity"].includes(roverName);
let filters = reactive<RoverApiFilters>({
  sortType: "desc",
  showLatest: false,
  selectedLatestSols: [] as number[],
  solRange: {
    from: null,
    to: null,
  },
  selectedCameras: [],
});
const pagination = reactive<RoverApiPagination>({
  perPage: 50,
  selectedPage: 0,
});

const rover = await $fetch(`/api/info?rover=${roverName}`);
const latest = isActiveRover
  ? await $fetch(`/api/latest?rover=${roverName}`)
  : ({} as Record<string, any>);
let latestSols: number[];
if (Object.hasOwn(latest, "latest_sols")) latestSols = latest.latest_sols;
else latestSols = [];

let data = ref<Record<string, any> | undefined>({});
const downloading = ref(false);

const photosUrls = computed(() => data.value?.fullres ?? []);
const previewsUrls = computed(() => data.value?.previews ?? []);
const totalResults = computed<number>(() => data.value?.total_results ?? 0);

/**
 * Methods
 */

const getPhotos = async () => {
  downloading.value = true;
  data.value = await getRoverPhotos(roverName, filters, pagination);
  downloading.value = false;
};
const getPhotosDebounced = useDebounceFn(getPhotos, 600);

// Pagination event handlers

const onPageChanged = async (page: number) => {
  pagination.selectedPage = page;
};

// ActiveFiltersBadges event handlers

const onCamerasRemove = (camera: string) => {
  filters.selectedCameras = filters.selectedCameras.filter(
    (cam) => cam != camera
  );
};

const onSolsListRemove = (sol: number) => {
  filters.selectedLatestSols = filters.selectedLatestSols.filter(
    (s) => s != sol
  );
  if (filters.selectedLatestSols.length == 0) filters.showLatest = false;
};

const onSolsRangeClear = () => {
  filters.solRange = { from: null, to: null };
};

const onClearAll = () => {
  filters.sortType = "desc";
  filters.showLatest = false;
  filters.selectedLatestSols = [];
  filters.solRange.from = null;
  filters.solRange.to = null;
  filters.selectedCameras = [];
};

/**
 * Hooks
 */

onBeforeMount(async () => {
  await getPhotos();
});

watch(filters, async () => {
  await getPhotosDebounced();
});
watch(pagination, async () => {
  await getPhotosDebounced();
});
definePageMeta({ layout: false });
</script>

<template>
  <NuxtLayout name="gallery-layout">
    <template #header>
      <ActiveFiltersBadges
        :sols-list="filters.selectedLatestSols"
        :sols-range="filters.solRange"
        :cameras-list="filters.selectedCameras"
        @update:cameras:remove="onCamerasRemove($event)"
        @update:sols-list:remove="onSolsListRemove($event)"
        @update:sols-range:clear="onSolsRangeClear()"
        @update:clear-all="onClearAll()"
      />
      <div class="divider m-0"></div>
      <Pagination
        :per-page="pagination.perPage"
        :total="totalResults"
        @update:page="onPageChanged($event)"
      />
    </template>

    <template #sidepanel>
      <FiltersPanel
        :is-active-rover="isActiveRover"
        :cameras="rover.cameras"
        :latest-sols="latestSols"
        :max-sol="rover.max_sol"
        v-model:filters="filters"
      />
    </template>

    <template #content>
      <progress v-show="downloading" class="progress absolute z-10"></progress>
      <progress v-show="!downloading" class="progress absolute z-10" value="0"></progress>
      <Gallery :images="photosUrls" :previews="previewsUrls" />
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
