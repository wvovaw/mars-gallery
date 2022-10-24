<script></script>

<template>
  <nav class="navbar">
    <div class="navbar-start">
      <button class="btn btn-ghost btn-circle">
        <Icon name="ion:search" size="2em" />
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <Icon name="ion:ios-bell" size="2em" />
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
    <div class="navbar-center">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">MG</NuxtLink>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end" @click="$event.target.blur()">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <Icon name="ion:menu-sharp" size="2em" />
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NuxtLink to="/" class="">Index</NuxtLink></li>
          <li><NuxtLink to="/rovers" class="">Rovers</NuxtLink></li>
          <li><NuxtLink to="/galery" class="">Galery</NuxtLink></li>
          <li><NuxtLink to="/about" class="">About</NuxtLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
