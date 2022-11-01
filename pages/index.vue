<script lang="ts" setup></script>

<template>
  <div class="rovers">
    <div class="hero min-h-screen" style="background-image: url(/hero.jpg)">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Mars gallery</h1>
          <p class="mb-5">
            The place where You can see all<sup>?</sup> photos from
            <a href="https://mars.nasa.gov/" class="hover:text-info"
              ><Icon name="simple-icons:nasa" size="2rem"
            /></a>
            rovers
          </p>
          <div class="btn-group btn-group-vertical sm:btn-group-horizontal">
            <NuxtLink
              to="/rovers/Perseverance"
              class="btn btn-primary brightness-125"
              >Perseverance</NuxtLink
            >
            <NuxtLink
              to="/rovers/Curiosity"
              class="btn btn-primary brightness-100"
              >Curiosity</NuxtLink
            >
            <NuxtLink
              to="/rovers/Opportunity"
              class="btn btn-primary brightness-75"
              >Opportunity</NuxtLink
            >
            <NuxtLink to="/rovers/Spirit" class="btn btn-primary brightness-50"
              >Spirit</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:mx-32">
      <div class="card bg-base-200 shadow-xl m-10 xl:card-side md:p-10">
        <figure>
          <img
            class="w-96"
            src="/perseverance.png"
            alt="Perseverance"
            loading="eager"
          />
        </figure>
        <div class="card-body bg-base-300 rounded-xl">
          <h2 class="card-title">
            Perseverance
            <div class="badge badge-success">Active</div>
          </h2>
          <p><b>Mission name: </b>Mars 2020</p>
          <p>
            <b>Main job: </b>Seek signs of ancient life and collect samples of
            rock and regolith (broken rock and soil) for possible return to
            Earth.
          </p>
          <p><b>Launch date: </b>July 30, 2020</p>
          <p><b>Landing: </b>Feb. 18, 2021, Jezero Crater, Mars</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/rovers/Perseverance" class="btn btn-primary"
              >Go to gallery</NuxtLink
            >
          </div>
        </div>
      </div>
      <div
        class="card bg-base-200 shadow-xl m-10 xl:card-side md:p-10 flex flex-col-reverse"
      >
        <div class="card-body bg-base-300 rounded-xl">
          <h2 class="card-title">
            Curiosity
            <div class="badge badge-success">Active</div>
          </h2>
          <p><b>Mission name: </b>Mars Science Laboratory (MSL)</p>
          <p>
            <b>Main job: </b>Study the ancient habitability and the potential
            for life on Mars.
          </p>
          <p><b>Launch date: </b>Nov. 26, 2011</p>
          <p><b>Landing: </b>Aug. 6, 2012, Gale Crater, Mars</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/rovers/Curiosity" class="btn btn-primary"
              >Go to gallery</NuxtLink
            >
          </div>
        </div>
        <figure class="sm:relative">
          <img
            class="w-96"
            src="/curiosity.png"
            alt="Curiosity"
            loading="eager"
          />
        </figure>
      </div>
      <div class="card bg-base-200 shadow-xl m-10 xl:card-side md:p-10">
        <figure>
          <img
            src="/spirit.png"
            class="w-96"
            alt="Opportunity"
            loading="eager"
          />
        </figure>
        <div class="card-body bg-base-300 rounded-xl">
          <h2 class="card-title">
            Opportunity
            <div class="badge badge-error">Finished</div>
          </h2>
          <p><b>Mission name: </b>Mars Exploration Rover Mission (MER)</p>
          <p>
            <b>Main job: </b>Mars Surface Exploration. Search for and
            characterize a wide range of rocks and soils that hold clues to past
            water activity on Mars. Opportunity operated almost 15 years,
            setting several records and making a number of key discoveries.
          </p>
          <p><b>Launch date: </b>July 8, 2003</p>
          <p><b>Landing: </b>Jan. 25, 2004, Eagle Crater, Mars</p>
          <p><b>Finish date: </b>Feb. 13, 2019</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/rovers/Opportunity" class="btn btn-primary"
              >Go to gallery</NuxtLink
            >
          </div>
        </div>
      </div>
      <div
        class="card bg-base-200 shadow-xl m-10 xl:card-side md:p-10 flex flex-col-reverse"
      >
        <div class="card-body bg-base-300 rounded-xl">
          <h2 class="card-title">
            Spirit
            <div class="badge badge-error">Finished</div>
          </h2>
          <p><b>Mission name: </b>Mars Exploration Rover Mission (MER)</p>
          <p>
            <b>Main job: </b>Mars Surface Exploration. Search for and
            characterize a wide range of rocks and soils that hold clues to past
            water activity on Mars. Spirit rover — and it's twin Opportunity —
            studied the history of climate and water at sites on Mars where
            conditions may once have been favorable to life.
          </p>
          <p><b>Launch date: </b>June 10, 2003</p>
          <p><b>Landing: </b>Jan. 4, 2004, Gusev Crater, Mars</p>
          <p><b>Finish date: </b>May 25, 2011</p>
          <div class="card-actions justify-end">
            <NuxtLink to="/rovers/Spirit" class="btn btn-primary"
              >Go to gallery</NuxtLink
            >
          </div>
        </div>
        <figure>
          <img
            src="/spirit.png"
            class="w-96"
            alt="Opportunity"
            loading="eager"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
