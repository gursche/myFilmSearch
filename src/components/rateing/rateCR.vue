<script setup>
import { useFilmListStore } from "@/stores/filmList";
const filmList = useFilmListStore();
const actualRate = defineProps({ value: Number, imdbID: String });
</script>
<template>
  <div class="container-fluid p-0">
    <div
      v-for="index in 5"
      :key="index"
      class="w-20 d-inline-flex"
      style="width: 20%"
    >
      <div
        @click="filmList.rateFilm(actualRate.imdbID, index)"
        class="text-center"
      >
        <div v-if="index <= actualRate.value">
          <img
            src="/rateing/star_y.png"
            title="click to rate!"
            class="fluid-grow"
            style="width: 80%; cursor: pointer"
          />
        </div>
        <div v-else>
          <img
            src="/rateing/star_w.png"
            title="click to rate!"
            class="fluid-grow"
            style="width: 80%; cursor: pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>
