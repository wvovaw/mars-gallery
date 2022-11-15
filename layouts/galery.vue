<script lang="ts" setup></script>

<template>
  <div class="root">
    <TheNavbar class="sticky top-0 z-50">
      <template #navbar-start>
        <label
          tabindex="0"
          for="drawer"
          class="btn swap swap-rotate drawer-button btn-ghost btn-circle lg:hidden"
        >
          <Icon name="ion:menu-sharp" size="2em" />
        </label>
      </template>
    </TheNavbar>
    <div class="filters pb-2 bg-base-200 drop-shadow-xl">
      <slot name="filters" />
    </div>
    <div class="drawer drawer-mobile relative h-[79dvh]">
      <input id="drawer" type="checkbox" class="drawer-toggle" />
      <slot name="content" />

      <div class="drawer-side">
        <label for="drawer" class="drawer-overlay"></label>
        <slot name="drawer" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
