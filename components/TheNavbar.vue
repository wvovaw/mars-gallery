<script></script>

<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start">
      <slot name="navbar-start" />
    </div>
    <div class="navbar-center">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
        <Icon name="game-icons:mars-curiosity" size="2em" />
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <ul
        tabindex="0"
        class="menu menu-compact menu-horizontal p-0 hidden md:flex"
      >
        <li tabindex="0">
          <NuxtLink to="/rovers" class=""
            >Rovers
            <Icon name="ion:ios-arrow-down" size="1em" />
          </NuxtLink>
          <ul class="p-2 rounded-box bg-base-200 z-10">
            <li>
              <NuxtLink to="/rovers/Perseverance" class=""
                >Perseverance</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/rovers/Curiosity" class="">Curiosity</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/rovers/Opportunity" class="">Opportunity</NuxtLink>
            </li>
            <li><NuxtLink to="/rovers/Spirit" class="">Spirit</NuxtLink></li>
          </ul>
        </li>
        <li><NuxtLink to="/about" class="">About</NuxtLink></li>
        <div class="divider m-0" />
        <li>
          <a href="https://github.com/wvovaw/mars-gallery" class=""
            ><Icon name="entypo-social:github" />Github</a
          >
        </li>
      </ul>
      <div class="dropdown dropdown-bottom dropdown-end">
        <label tabindex="0" class="btn btn-ghost md:hidden">
          <Icon name="ri:menu-3-fill" size="2em" />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu menu-compact mt-3 p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li tabindex="0">
            <ul>
              <NuxtLink to="/rovers">Rovers</NuxtLink>
              <Icon name="ion:ios-arrow-down" size="1em" />
            </ul>
            <ul class="bg-base-300 px-2 mr-2 menu menu-compact relative left-1">
              <li><NuxtLink to="/rovers/Spirit" class="">Spirit</NuxtLink></li>
              <li>
                <NuxtLink to="/rovers/Opportunity" class=""
                  >Opportunity</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/rovers/Curiosity" class="">Curiosity</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/rovers/Perseverance" class=""
                  >Perseverance</NuxtLink
                >
              </li>
            </ul>
          </li>
          <li><NuxtLink to="/about" class="">About</NuxtLink></li>
          <div class="divider m-0" />
          <li>
            <a href="https://github.com/wvovaw/mars-gallery" class=""
              ><Icon name="entypo-social:github" />Github</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
