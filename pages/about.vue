<script lang="ts" setup></script>

<template>
  <div class="prose m-5">
    <h1>Mars gallery</h1>
    <p>
      On this site You can watch photos that was taken by different cameras
      placed rovers
      <NuxtLink to="/rovers/Spirit" class="hover:text-primary">Spirit</NuxtLink
      >,
      <NuxtLink to="/rovers/Opportunity" class="hover:text-primary"
        >Opportunity</NuxtLink
      >,
      <NuxtLink to="/rovers/Perseverance" class="hover:text-primary"
        >Perseverance</NuxtLink
      >
      and
      <NuxtLink to="/rovers/Curiosity" class="hover:text-primary"
        >Curiosity</NuxtLink
      >
      that was sent on mars by
      <a href="https://mars.nasa.gov/" class="hover:text-info"
        ><Icon name="simple-icons:nasa" size="2rem"
      /></a>
      in cases of unique missions of exploring Mars surface, soil composition
      and to study the ancient habitability and the potential for
      <a href="https://youtu.be/AZKcl4-tcuo">life on mars</a>.
    </p>
    <p>
      All available photos loads from NASA's side using
      <a href="https://github.com/chrisccerami/mars-photo-api/">This API</a>.
    </p>
  </div>
</template>

<style scoped></style>
