<script lang="ts" setup></script>

<template>
  <div class="root">
    <TheNavbar>
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
    <div class="drawer drawer-mobile">
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
