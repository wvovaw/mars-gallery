<script setup lang="ts">
import { RoverApiFilters } from "@/lib/types";

interface Props {
  isActiveRover: boolean;
  latestSols: number[];
  maxSol: number;
  cameras: Record<string, { name: string; filter: string }>;
  filters: RoverApiFilters;
}
const props = defineProps<Props>();

/**
 * Variables
 */

const f = reactive<RoverApiFilters>(props.filters);

/**
 * Methods
 */
const toggleShowLatest = () => {
  f.showLatest = !f.showLatest;

  if (f.showLatest === true) f.selectedLatestSols = props.latestSols;
  else f.selectedLatestSols = [];

  f.solRange.from = null;
  f.solRange.to = null;
};

const toggleLatestSol = (sol: number) => {
  if (f.selectedLatestSols.includes(sol))
    f.selectedLatestSols = f.selectedLatestSols.filter((i) => i != sol);
  else f.selectedLatestSols.push(sol);

  if (f.selectedLatestSols.length == 0) f.showLatest = false;
};
</script>

<template>
  <aside class="bg-base-200 w-80">
    <div class="input-group-xs p-4">
      <label class="label">
        <span class="label-text">Sort by sol</span>
        <select
          name="sort"
          class="select select-secondary select-sm"
          v-model="f.sortType"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <label v-if="isActiveRover" class="cursor-pointer label">
        <span class="label-text">Show latest</span>
        <input
          type="checkbox"
          class="toggle toggle-secondary"
          :checked="f.showLatest"
          @change="toggleShowLatest"
        />
      </label>
    </div>
    <label class="label px-4">
      <span class="label-text text-lg">Select sol</span>
    </label>
    <div v-if="f.showLatest" class="input-group-xs p-4">
      <label v-for="sol in latestSols" class="cursor-pointer label py-0">
        <input
          type="checkbox"
          class="checkbox checkbox-xs checkbox-secondary"
          :checked="f.selectedLatestSols.includes(sol)"
          @change="toggleLatestSol(sol)"
        />
        <span class="label-text">{{ sol }}</span>
      </label>
    </div>
    <div v-else class="input-group-xs p-4">
      <label class="label">
        <span class="label-text-alt">From </span>
        <input
          type="number"
          :min="0"
          :max="maxSol"
          v-model.number="f.solRange.from"
          class="input input-secondary input-bordered input-xs"
          :disabled="f.showLatest"
        />
      </label>
      <label class="label">
        <span class="label-text-alt">To </span>
        <input
          type="number"
          min="0"
          :max="maxSol"
          v-model.number="f.solRange.to"
          class="input input-secondary input-bordered input-xs"
          :disabled="f.showLatest"
        />
      </label>
    </div>
    <label class="label px-4">
      <span class="label-text text-lg">Cameras</span>
    </label>
    <ul class="p-4 overflow-y-hidden text-base-content">
      <label
        v-for="(value, key) in cameras"
        :key="key"
        class="cursor-pointer label"
      >
        <input
          type="checkbox"
          name="camera"
          class="checkbox checkbox-secondary checkbox-sm"
          :value="value['filter']"
          v-model="f.selectedCameras"
        />
        <span class="label-text">{{ value["name"] }}</span>
      </label>
    </ul>
  </aside>
</template>
