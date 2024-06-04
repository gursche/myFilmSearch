<script setup>
const actualFavorite = defineProps({ 
  value: Boolean, 
  imdbID: String });

import { useFilmListStore } from "@/stores/filmList";
const filmList = useFilmListStore();
</script>

<template>
  <div v-if="actualFavorite.value == false">
    <div @click="filmList.favoriteFilm(actualFavorite.imdbID, true)">
      <img
        src="/rateing/checked.png"
        style="width: 80%; cursor: pointer"
        title="click to add to favorites!"
      />
    </div>
  </div>
  <div v-else>
    <div @click="filmList.favoriteFilm(actualFavorite.imdbID, false)">
      <img
        src="/rateing/unchecked.png"
        style="width: 80%; cursor: pointer"
        title="click to remove from favorites!"
      />
    </div>
  </div>
</template>
