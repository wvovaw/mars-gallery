<script setup lang="ts">
interface Props {
  solsList: number[];
  camerasList: string[];
  solsRange: {
    from: number | null;
    to: number | null;
  };
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:sols-list:remove", sol: number): void;
  (e: "update:sols-range:clear"): void;
  (e: "update:cameras:remove", filter: string): void;
  (e: "update:clear-all"): void;
}>();

const solsRangeLabelString = computed(() => {
  if (!props.solsRange.from && !props.solsRange.to) return "";

  let res = "Sol: ";

  if (props.solsRange.from) res += props.solsRange.from;
  else res += "Landing";

  res += " to ";

  if (props.solsRange.to) res += props.solsRange.to;
  else res += " Last sol";

  return res;
});
</script>

<template>
  <div class="px-4">
    <!-- Active Filters Badges -->
    <label class="label"
      >Filters:
      <div class="ml-2 badges flex flex-row flex-wrap gap-2">
        <div v-for="sol in solsList" class="badge badge-outline badge-sm">
          <Icon
            @click="emits('update:sols-list:remove', sol)"
            name="ion:close-sharp"
            class="cursor-pointer"
            size="1rem"
          />
          Sol: {{ sol }}
        </div>
        <div
          v-if="solsRange.from || solsRange.to"
          class="badge badge-outline badge-sm"
        >
          <Icon
            @click="emits('update:sols-range:clear')"
            name="ion:close-sharp"
            class="cursor-pointer"
            size="1rem"
          />
          {{ solsRangeLabelString }}
        </div>
        <div
          v-for="i in camerasList"
          :key="i"
          class="badge badge-outline badge-sm"
        >
          <Icon
            @click="emits('update:cameras:remove', i)"
            name="ion:close-sharp"
            size="1rem"
            class="cursor-pointer"
          />
          {{ i }}
        </div>
        <Icon
          v-if="
            solsRange.from ||
            solsRange.to ||
            solsList.length > 0 ||
            camerasList.length > 0
          "
          @click="emits('update:clear-all')"
          name="ion:trash"
          class="cursor-pointer"
          size="1rem"
        />
      </div>
    </label>
  </div>
</template>
