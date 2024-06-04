<script setup>
const passedData = defineProps({
  imdbID: String,
});

import myRateing from "@/components/rateing/rateCR.vue";
import myFavorite from "@/components/rateing/favoritesCR.vue";
import myInfo from "@/components/info/infoModal.vue";

import { useFilmListStore } from "@/stores/filmList";
const filmList = useFilmListStore();
const my = filmList.getFilmByImdbID(passedData.imdbID);
</script>

<template>
  <div
    class="card align-self-center h-100"
    data-bs-theme="light"
  >
    <img
      class="card-img-top mt-auto rounded p-2"
      v-bind:src="my.film.Poster"
      alt="filmposter missing"
      onerror="this.onerror=null; this.src='/noTitle.png'"
      :title="my.film.Title"
      style="cursor: pointer;"
    />
    <div v-if="my.film.Poster == '/noTitle.png'">
      <p class="card-text p-2 text-center">{{ my.film.Title }}</p>
    </div>
    <div class="card-footer mt-auto p-1 bg-dark">
      <table class="p-1">
        <tr>
          <td class="text-center p-0">
            <myRateing :value="my.myRateing" :imdbID="my.id" />
          </td>
          <td class="text-center p-0">
            <myFavorite :value="my.myFavorite" :imdbID="my.id" />
          </td>
          <td class="text-center p-0">
            <myInfo :imdbID="my.id" :infoSet="true" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
