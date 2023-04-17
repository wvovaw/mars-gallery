<script setup lang="ts">
interface Props {
  previews: string[];
  images: string[];
}
const props = defineProps<Props>();

/**
 * Variables
 */
const selectedImage = ref("");
const showModal = ref(false);

/**
 * Methods
 */
const selectImage = (i: number) => {
  selectedImage.value = props.images[i];
  setTimeout(() => (showModal.value = true), 500);
};
</script>

<template>
  <div
    v-if="previews.length == 0"
    class="drawer-content grid place-content-center"
  >
    <Icon name="noto:woman-shrugging-light-skin-tone" size="8em" />
    <div class="font-bold">No photos was found</div>
    <div class="text-xs">Try to reset filters</div>
  </div>
  <div
    v-else
    class="drawer-content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
  >
    <figure
      v-for="(preview, ix) in previews"
      :key="preview"
      class="h-auto max-w-full grid place-content-center"
      @click="selectImage(ix)"
    >
      <img
        :src="preview"
        alt="Secret UFO photo"
        class="rounded-lg"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>
  <input type="checkbox" id="fullscreen-img-modal" class="modal-toggle" />
  <div
    class="modal modal-middle backdrop-blur-sm"
    :class="{ 'modal-open': showModal }"
    @click="showModal = false"
  >
    <div class="modal-box p-0 max-w-5xl">
      <figure class="grid justify-center">
        <img :src="selectedImage" alt="Secret UFO photo" />
      </figure>
    </div>
  </div>
</template>
