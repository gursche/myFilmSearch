<script setup>
import myInfoPlaceholder from "@/components/info/infoPlaceholder.vue";
import myNavbar from "@/components/navbarC.vue";
import myMain from "@/components/mainC.vue";
import myfooter from "@/components/footerC.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@/assets/myCss.css";

document.title = "myFilm App";
</script>

<template>
  <myInfoPlaceholder />
  <div class="main bg-dark">
    <div class="navbar">
      <myNavbar />
    </div>
    <div class="myContent">
      <myMain />
    </div>
    <div class="footer">
      <myfooter />
    </div>
  </div>
</template>
