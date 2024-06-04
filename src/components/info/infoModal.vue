<script setup>
const passedData = defineProps({
  imdbID: String,
  infoSet: Boolean,
});

import { ref } from "vue";
const open = ref(false);
const message = ref();

import { useFilmListStore } from "@/stores/filmList";

const filmList = useFilmListStore();
const my = filmList.getFilmByImdbID(passedData.imdbID);
</script>
<template>
  <div @click="open = true">
    <div v-if="my.myComment == ''">
      <img src="/rateing/info.png" style="width: 80%; cursor: pointer" />
    </div>
    <div v-else>
      <img src="/rateing/withInfo.png" style="width: 80%; cursor: pointer" />
    </div>
  </div>
  <Teleport to="#myFilmInfoBox">
    <div v-if="open" class="infoAll">
      <div class="infoItem rounded">
        <div class="flex-row border-bottom">
          <div class="d-flex justify-content-end p-1">
            <div
              @click="open = false"
              class="text-end align-top"
              title="click to close!"
              style="cursor: pointer"
            >
              X
            </div>
          </div>
        </div>
        <div class="d-flex row p-2">
          <div
            class="justify-content-center text-center col-md-3  col-xl-2 col-sm-12 p-2"
          >
            <img
              class="img-fluid"
              v-bind:src="my.film.Poster"
              alt="filmposter missing"
            />
          </div>
          <div class="col-md-9 col-xk-10 col-sm-12">
            <div class="flex-row">
              <div class="col text-center">
                <h2>{{ my.film.Title }}</h2>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">imdbID:&nbsp;</div>
                <div class="tValue">{{ my.id }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">Released:&nbsp;</div>
                <div class="tValue">{{ my.film.Released }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">Runtime:&nbsp;</div>
                <div class="tValue">{{ my.film.Runtime }}</div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">Language:&nbsp;</div>
                <div class="tValue">{{ my.film.Language }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">Country:&nbsp;</div>
                <div class="tValue">{{ my.film.Country }}</div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">Genre:&nbsp;</div>
                <div class="tValue">{{ my.film.Genre }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">Type:&nbsp;</div>
                <div class="tValue">{{ my.film.Type }}</div>
              </div>
              <div v-if="my.film.Type == 'series'" class="d-flex col">
                <div class="tItem">totalSeasons:&nbsp;</div>
                <div class="tValue">{{ my.film.totalSeasons }}</div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">Plot:&nbsp;</div>
                <div class="tValue">{{ my.film.Plot }}<br><br></div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">Director:&nbsp;</div>
                <div class="tValue">{{ my.film.Director }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">Writer:&nbsp;</div>
                <div class="tValue">{{ my.film.Writer }}</div>
              </div>
            </div>

            <div class="row">
              <div class="d-flex col">
                <div class="tItem">Actors:&nbsp;</div>
                <div class="tValue">{{ my.film.Actors }}</div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col col-md-6">
                <div class="tItem">Awards:&nbsp;</div>
                <div class="tValue">{{ my.film.Awards }}</div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex col">
                <div class="tItem">imdbRating:&nbsp;</div>
                <div class="tValue">{{ my.film.imdbRating }}</div>
              </div>
              <div class="d-flex col">
                <div class="tItem">imdbVotes:&nbsp;</div>
                <div class="tValue">{{ my.film.imdbVotes }}</div>
              </div>
              <div class="d-flex col  border border-1 rounded">
                <div v-if="my.film.Ratings" class="row p-2">
                  <div class="tItem" style="text-align: center;">rated by other: </div>
                  <div v-for="item in my.film.Ratings" :key="item" class="flex-row">
                    <div class="tItem" style="white-space: nowrap;">{{ item.Source }}:&nbsp;</div>
                    <div class="tValue" style="text-align: right;">{{ item.Value }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex">
                <div class="tItem">my Comment:</div>
                <div class="tValue">
                  <pre>{{ my.myComment }} &nbsp;</pre>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="d-flex">
                <div class="tItem">
                  Leave or replace comment:&nbsp;
                </div>
                <div class="tValue w-100">
                  <textarea
                    v-model="message"
                    :placeholder="my.myComment"
                    class="w-100"
                  ></textarea>
                </div>
                <div class="col col-md-2 text-end">
                  <button
                    @click="filmList.commentFilm(my.id, message)"
                    class="btn btn-primary"
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
