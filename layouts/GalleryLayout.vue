<script lang="ts" setup></script>

<template>
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
  <div class="pb-2 bg-base-200">
    <slot name="header" />
  </div>
  <div class="drawer drawer-mobile relative h-[calc(100vh-152px)]">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <slot name="content" />

    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <slot name="sidepanel" />
    </div>
  </div>
</template>

<style scoped></style>
