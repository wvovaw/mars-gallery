<script setup lang="ts">
interface Props {
  perPage: number;
  total: number;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:page", page: number): void;
}>();
/**
 * Variables
 */

const currentPage = ref(0);
const totalPages = computed(() => Math.floor(props.total / props.perPage));

const showingResultsString = computed(
  () =>
    `Showing ${props.perPage * currentPage.value + 1}-${
      (currentPage.value + 1) * props.perPage
    } of ${props.total} results`
);

/**
 * Methods
 */

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--;
};

/**
 * Hooks
 */
watch(currentPage, (page: number) => {
  emits("update:page", page);
});
</script>

<template>
  <div class="flex justify-between">
    <label class="label py-0 px-4"> {{ showingResultsString }} </label>
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
          :max="totalPages"
          v-model.number="currentPage"
          class="input input-secondary input-bordered input-xs w-20"
        />
        <span> of {{ totalPages }} </span>
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
