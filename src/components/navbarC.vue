<script setup>
import { useFilmListStore } from "@/stores/filmList";
const myFilmList = useFilmListStore();
</script>

<template>
  <nav class="navbar top navbar-dark navbar-expand-md">
    <div class="container-fluid">
      <a class="navbar-brand" id="top">my Filmsearch</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ">
          <li class="nav-item d-flex flex-nowrap">
            <p class="mt-auto mb-auto ">
              <input
                name="searchFilmTxInput"
                v-model="myFilmList.searchFilmTitle"
                placeholder="Search"
                class="form-input-sm"
              />
            </p>
            <p class="mt-auto mb-auto p-2">
              <select
                v-model="myFilmList.searchFilmType"
                class="form-select-sm btn btn-sm btn-success"
              >
                <option
                  v-for="item in myFilmList.searchFilmTypeList"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </p>
            <p class="mt-auto mb-auto p-2">
              <button
                class="btn btn-sm btn-outline-success"
                @click="myFilmList.searchByTitle"
              >
                Search
              </button>
            </p>
          </li>
          <li class="nav-item d-flex flex-wrap">
            <p class="mt-auto mb-auto p-2">Favorite:</p>
            <p class="mt-auto mb-auto p-2">
              <select v-model="myFilmList.filterFav" class="form-select-sm">
                <!-- inline object literal -->
                <option
                  v-for="item in Object.keys(myFilmList.filterFavTypes)"
                  :key="myFilmList.filterFavTypes[item]"
                  :value="myFilmList.filterFavTypes[item]"
                >
                  {{ item }}
                </option>
              </select>
            </p>
          </li>

          <li class="nav-item d-flex flex-wrap">
            <p class="mt-auto mb-auto p-2">Rated:</p>
            <p class="mt-auto mb-auto p-2">
              <select v-model="myFilmList.filterRate" class="form-select-sm">
                <!-- inline object literal -->
                <option
                  v-for="item in Object.keys(myFilmList.filterRateTypes)"
                  :key="myFilmList.filterRateTypes[item]"
                  :value="myFilmList.filterRateTypes[item]"
                >
                  {{ item }}
                </option>
              </select>
            </p>
          </li>
          <li class="nav-item d-flex flex-wrap">
            <p class="mt-auto mb-auto p-2">commented:</p>
            <p class="mt-auto mb-auto p-2">
              <select v-model="myFilmList.filterComment" class="form-select-sm">
                <!-- inline object literal -->
                <option
                  v-for="item in Object.keys(myFilmList.filterCommentTypes)"
                  :key="myFilmList.filterCommentTypes[item]"
                  :value="myFilmList.filterCommentTypes[item]"
                >
                  {{ item }}
                </option>
              </select>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
