<script setup>
import { useFilmListStore } from "@/stores/filmList";
import myFilm from "@/components/filmC.vue";

const FilmList = useFilmListStore();
</script>

<template>
  <div id="errorMsg">{{ FilmList.errorMsg }}</div>
  <main class="flex-col col-md-12">
    <div class="d-flex flex-row flex-wrap justify-content-center">
      <div v-for="item in FilmList.searchNavBar" :key="item" class="p-2 col-md-2">
        <myFilm :imdbID="item.film.imdbID" />
      </div>
    </div>
  </main>
</template>
